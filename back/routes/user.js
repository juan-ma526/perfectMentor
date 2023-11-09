const express = require("express");
const router = express.Router();

const {
  allUsers,
  signUp,
  signIn,
  logout,
  profile,
  verifiedUser,
  verifyToken,
} = require("../controllers/user");
const { authRequired } = require("../middlewares/validateToken");

router.get("/allUsers", allUsers);

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);
router.get("/verifyToken", authRequired, verifyToken);

router.put("/profile", authRequired, profile);
router.post("/verifiedUser", authRequired, verifiedUser);

module.exports = router;
