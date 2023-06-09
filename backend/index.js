const express = require("express");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const connection = require("./config/db.config").connection;
const JWT_SECRET = require("./config/db.config").JWT_SECRET;
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const dataController = require("./controllers/dataController");

const userRoute = require("./routes/userRoute");
const dataRoute = require("./routes/dataRoute");
const settingsRoute = require("./routes/settingsRoute");

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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, app.get("jwt-secret"), (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }
    const email = payload.email;
    connection.query(
      "SELECT * FROM userTable WHERE email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.sendStatus(500);
        }
        if (results.length === 0) {
          return res.sendStatus(401);
        }
        req.user = results[0];
        next();
      }
    );
  });
};

app.use("/api/v1/users", userRoute);
app.use("/api/v1/metrics", dataRoute);

app.get("/verify-email/:token", userController.verifyEmail);
app.use("/api/v1/settings", authenticateToken, settingsRoute);
app.get("/complete/:dataID/:token", dataController.complete);

app.use(
  "/api/v1/data",
  authenticateToken,
  (req, res, next) => {
    if (req.user.verified) {
      next();
    } else {
      res.status(401).send("Email not verified.");
    }
  },
  dataRoute
);

//not to be touched below this
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
