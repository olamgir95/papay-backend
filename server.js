const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://Olamgir:Olamgirbek.95@mongodblearn.rn4lucq.mongodb.net/Reja";

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
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `Server is running on port ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
