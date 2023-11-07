const express = require("express");
const router = express.Router();

const {
  allUsers,
  signUp,
  signIn,
  logout,
  profile,
} = require("../controllers/user");
const { authRequired } = require("../middlewares/validateToken");

router.get("/allUsers", allUsers);

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);

router.put("/profile", authRequired, profile);

module.exports = router;
