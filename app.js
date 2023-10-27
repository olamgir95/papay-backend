console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

//1 kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2 session code

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, //for 30 minut
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  console.log(res.locals.member, "mem");
  next();
});
//3 views code
app.set("views", "views");
app.set("view engine", "ejs");

//4. Routing code
app.use("/", router);
app.use("/resto", router_bssr);

module.exports = app;
