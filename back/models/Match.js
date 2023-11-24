const moongose = require("mongoose");
const { UserSchema } = require("./Users");

const MatchSchema = new moongose.Schema(
  {
    idUserDestination: {
      type: moongose.Schema.ObjectId,
      required: [true, "idUserDestination is required"],
    },
    status: {
      type: String,
      default: "no answer",
      enum: ["no answer", "cancel", "check it"],
    },
    user: UserSchema,
  },
  { timestamps: true, versionKey: false }
);

module.exports = moongose.model("Match", MatchSchema);
