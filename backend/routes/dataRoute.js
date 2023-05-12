const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");


router.get("/", dataController.listData);
router.get("/:data_id", dataController.findDataById);
router.post('/', dataController.createData);

module.exports = router;
