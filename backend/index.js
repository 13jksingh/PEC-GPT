const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const connection = require("./config/db.config").connection;
const JWT_SECRET = require("./config/db.config").JWT_SECRET;
const userController = require("./controllers/userController");

const userRoute = require("./routes/userRoute");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.set("jwt-secret", JWT_SECRET);

app.use("/api/v1/users", userRoute);

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
