const express = require("express");
const router = express.Router();
const User = require("./user");
const Match = require("./match");
const Notification = require("./notification");
const Message = require("./message");

router.use("/users", User);
router.use("/match", Match);
router.use("/notification", Notification);
router.use("/message", Message);

module.exports = router;
