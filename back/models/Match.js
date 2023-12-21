const moongose = require("mongoose");
const { Schema } = moongose;

const MatchSchema = new moongose.Schema(
  {
    idUserDestination: {
      type: moongose.Schema.ObjectId,
      required: [true, "idUserDestination is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    email: {
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

module.exports = moongose.model("Match", MatchSchema);
