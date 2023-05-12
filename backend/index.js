const express = require("express");
const app = express();

const connection = require("./config/db.config").connection;
const JWT_SECRET = require("./config/db.config").JWT_SECRET;




app.use(express.json());

app.set("jwt-secret", JWT_SECRET);

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
