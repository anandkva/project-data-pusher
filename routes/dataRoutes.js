const express = require("express");
const router = express.Router();
const { handleIncomingData } = require("../controllers/dataHandlerController");

router.post("/incoming_data", handleIncomingData);

module.exports = router;
