console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

//1 kirish code
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 2 session code

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 300, //for 300 minut
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

//3 views code
app.set("views", "views");
app.set("view engine", "ejs");

//4. Routing code
app.use("/", router);
app.use("/resto", router_bssr);

const server = http.createServer(app);

//SOCKET.IO BACKEND SERVER //
const io = require("socket.io")(server, {
  serveClient: false,
  origin: "*:*",
  transport: ["websocket", "xhr-polling"],
});
let online_users = 0;
io.on("connection", function (socket) {
  online_users++;
  console.log(`New user :`, online_users);
  socket.emit("greetMsg", { text: "welcome" });
  io.emit("infoUsers", { total: online_users });

  socket.on("disconnect", () => {
    online_users--;
    socket.broadcast.emit("infoUsers", { total: online_users });
    console.log("client disconnected, total:", online_users);
  });

  socket.on("createMsg", (data) => {
    console.log(data);
    io.emit("newMsg", data);
  });
});

module.exports = server;
