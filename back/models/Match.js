const moongose = require("mongoose");
const { Schema } = moongose;

const MatchSchema = new moongose.Schema(
  {
    idUserDestination: {
      type: Schema.Types.ObjectId,
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    usernameDestination: {
      type: String,
      trim: true,
    },
    roleDestination: {
      type: String,
      trim: true,
    },
    emailDestination: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = moongose.model("Match", MatchSchema);
