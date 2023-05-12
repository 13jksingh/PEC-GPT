const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

router.post("/register", userController.create);
router.post("/login", (req, res, next) => {
    authController.login(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (!req.user.verified) {
        return res.status(401).send("Email not verified.");
      }
      res.status(200).send("Login successful.");
    });
  });
module.exports = router;