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

module.exports = moongose.model("Notification", NotificationSchema);
