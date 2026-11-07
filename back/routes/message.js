const express = require("express");
const router = express.Router();

const { saveMessage, getAllMessage, deleteAllMessage } = require("../controllers/message");
const { authRequired } = require("../middlewares/validateToken");

router.get("/allMessage", authRequired, getAllMessage);

router.post("/saveMessage", authRequired, saveMessage);

router.delete("/deleteAll", authRequired, deleteAllMessage);

module.exports = router;
