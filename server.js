const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose.connect(
  connectionString,

  { useNewUrlParser: true,
     useUnifiedTopology: true
    },
  (err, goose) => {
    if ((err)) console.log("Error on connection mongoose");
    else {
      console.log("mongoose connection sucsess");
      // console.log(goose);

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = process.env.PORT || 3005;
      server.listen(PORT, function () {
        console.log(
          `Server is running on port ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
