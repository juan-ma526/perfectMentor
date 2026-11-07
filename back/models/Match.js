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
    usernameUser: {
      type: String,
      trim: true,
    },
    roleUser: {
      type: String,
      trim: true,
    },
    emailUser: {
      type: String,
      trim: true,
    },
    // ids del par ordenados y unidos: un solo match por par
    pairKey: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Match = moongose.model("Match", MatchSchema);
Match.on("index", (error) => error && console.log("Indice de Match:", error.message));

module.exports = Match;
