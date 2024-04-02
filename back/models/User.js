const moongose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = moongose;

const UserSchema = new moongose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      default: 18,
      min: [18, "Age min 18 years"],
      max: [99, "Age max 99 years"],
    },
    status: {
      type: String,
      default: "unverified",
      enum: ["unverified", "Verified"],
    },
    rol: {
      type: String,
      default: "mentee",
      enum: ["mentee", "mentor"],
    },
    matchs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

UserSchema.plugin(mongoosePaginate);

module.exports = {
  UserModel: moongose.model("User", UserSchema),
  UserSchema,
};
