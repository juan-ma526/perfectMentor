const express = require("express");
const router = express.Router();

const {
  allUsers,
  createMany,
  signUp,
  signIn,
  logout,
  profile,
  verifiedUser,
  verifyToken,
  deleteUserbyId,
} = require("../controllers/user");
const { authRequired } = require("../middlewares/validateToken");

router.get("/allUsers", allUsers);
router.get("/createMany", createMany);

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);
router.get("/verifyToken", authRequired, verifyToken);

router.put("/profile", authRequired, profile);
router.post("/verifiedUser", authRequired, verifiedUser);

router.delete("/deleteUser", deleteUserbyId);

module.exports = router;
