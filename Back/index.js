const app = require("./app");
let port = process.env.API_PORT | 8000;
const connectBd = require("./config/connection");
const conn = connectBd();
const moment = require("moment");

conn
  .authenticate()
  .then(() => {
    console.log("Connection to DB has been established succesfully.");
    app.listen(port, function () {
      console.log("App running on port: " + port);
      console.log(moment(new Date()).format("YYYY-MM-DD"));
    });
  })
  .catch((err) => {
    console.error(err);
  });