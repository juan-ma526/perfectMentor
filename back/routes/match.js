const express = require("express");
const router = express.Router();

const { allMatch, createMatch } = require("../controllers/match.js");

router.get("/allMatch", allMatch);
router.post("/createMatch", createMatch);

module.exports = router;
