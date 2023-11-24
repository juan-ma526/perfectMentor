const moongose = require("mongoose");

const UserSchema = new moongose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
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
      enum: ["unverified", "verified"],
    },
    rol: {
      type: String,
      default: "mentee",
      enum: ["mentee", "mentor"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = {
  UserModel: moongose.model("User", UserSchema),
  UserSchema,
};
