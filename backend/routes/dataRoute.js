const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

router.get("/", dataController.listData);
router.get("/history", dataController.history);
router.get("/:data_id", dataController.findDataById);
router.get("/requested/:data_id", dataController.request);
router.post('/post-data', dataController.createData);

module.exports = router;