const moongose = require("mongoose");
const { Schema } = moongose;

const NotificationSchema = new moongose.Schema(
  {
    idUserDestination: {
      type: Schema.Types.ObjectId,
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    emailUserDestination: {
      type: String,
      trim: true,
    },
    rolUserRte: {
      type: String,
      trim: true,
    },
    nameUserRte: {
      type: String,
      trim: true,
    },
    emailUserRte: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "no answer",
      enum: ["no answer", "cancel", "check it"],
    },
  },
  { timestamps: true, versionKey: false }
);

NotificationSchema.index({ idUser: 1, idUserDestination: 1 }, { unique: true });

const Notification = moongose.model("Notification", NotificationSchema);
Notification.on("index", (error) => error && console.log("Indice de Notification:", error.message));

module.exports = Notification;
