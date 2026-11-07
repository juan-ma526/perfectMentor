const moongose = require("mongoose");
const { Schema } = moongose;

const MessageSchema = new moongose.Schema(
  {
    message: {
      type: String,
    },
    from: {
      type: String,
    },
    matchId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = moongose.model("Message", MessageSchema);
