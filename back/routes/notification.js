const express = require("express");
const router = express.Router();

const {
  allNotifications,
  notificationsById,
  createNotifications,
  updateNotification,
  deleteAllNotifications,
} = require("../controllers/notification");
const { authRequired } = require("../middlewares/validateToken");

router.get("/allNotifications", authRequired, allNotifications);
router.get("/:id", authRequired, notificationsById);

router.post("/createNotifications", authRequired, createNotifications);

router.put("/updateNotification", authRequired, updateNotification);

router.delete("/deleteAllNotifications", authRequired, deleteAllNotifications);

module.exports = router;
