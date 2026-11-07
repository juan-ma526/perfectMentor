const express = require("express");
const router = express.Router();

const { allMatch, deleteAllMatch, findMatchById } = require("../controllers/match.js");
const { authRequired } = require("../middlewares/validateToken");

router.get("/allMatch", authRequired, allMatch);
router.get("/:id", authRequired, findMatchById);

router.delete("/deleteAllMatch", authRequired, deleteAllMatch);

module.exports = router;
