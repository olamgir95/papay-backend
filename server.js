const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongodb = require("mongodb");

const connectionString = process.env.MONGO_URL;

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) console.log("Error on connection MongoDb");
    else {
      console.log("MongoDb connection sucsess");
      module.exports = client;
      const app = require("./app");
      const server = http.createServer(app);
      let PORT = process.env.PORT || 5000;
      server.listen(PORT, function () {
        console.log(
          `Server is running on port ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
