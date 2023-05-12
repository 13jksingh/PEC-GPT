const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12617662",
  password: "b5z686lzWZ",
  database: "sql12617662",
});

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});
setInterval(function () {
  connection.query("SELECT 1");
}, 5000);
module.exports = {
  JWT_SECRET: "airbusdashboard000",
  connection: connection
};
