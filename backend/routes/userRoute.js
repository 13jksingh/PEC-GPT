const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

router.post("/register", userController.create);
router.post("/login", (req, res, next) => {
    authController.login(req, res, (err) => {
      res.status(200).send("Login successful.");
    });
  });

module.exports = router;