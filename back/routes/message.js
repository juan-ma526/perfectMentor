const express = require("express");
const router = express.Router();

const { saveMessage, getAllMessage, deleteAllMessage } = require("../controllers/message");

router.get("/allMessage", getAllMessage);

router.post("/saveMessage", saveMessage);

router.delete("/deleteAll", deleteAllMessage);

module.exports = router;
