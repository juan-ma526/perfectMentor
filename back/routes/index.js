const express = require("express");
const router = express.Router();
const User = require("./user");
const Match = require("./match");
const Notification = require("./notification");

router.use("/users", User);
router.use("/match", Match);
router.use("/notification", Notification);

module.exports = router;
