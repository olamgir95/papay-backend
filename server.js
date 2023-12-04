const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, goose) => {
    if (err) console.log("Error on connection mongoose");
    else {
      console.log("mongoose connection success");
      // console.log(goose);

      const app = require("./app");
      const server = http.createServer(app);
      let port = process.env.PORT || 3000;
      server.listen(port, function () {
        console.log(
          `Server is running on port ${port}, http://localhost:${port}`
        );
      });
    }
  }
);
