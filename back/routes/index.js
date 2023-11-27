const express = require("express");
const router = express.Router();
const User = require("./user");
const Match = require("./match");

router.use("/users", User);
router.use("/match", Match);

module.exports = router;
