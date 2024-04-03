const express = require("express");
const router = express.Router();

const { allMatch, deleteAllMatch, findMatchById } = require("../controllers/match.js");

router.get("/allMatch", allMatch);
router.get("/:id", findMatchById);

router.delete("/deleteAllMatch", deleteAllMatch);

module.exports = router;
