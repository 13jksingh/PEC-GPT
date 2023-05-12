const express = require("express");
const router = express.Router();
const settingsController = require("./../controllers/settingsController");

router.post("/change-username", settingsController.changeUsername);
router.post("/change-userType", settingsController.changeUserType);

module.exports = router;