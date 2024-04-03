const express = require("express");
const router = express.Router();

const {
  allNotifications,
  notificationsById,
  createNotifications,
  updateNotification,
  deleteAllNotifications,
} = require("../controllers/notification");

router.get("/allNotifications", allNotifications);
router.get("/:id", notificationsById);

router.post("/createNotifications", createNotifications);

router.put("/updateNotification", updateNotification);

router.delete("/deleteAllNotifications", deleteAllNotifications);

module.exports = router;
