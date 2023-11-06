const moongose = require("mongoose");

const UserSchema = new moongose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "",
  },
  profession: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  rol: {
    type: String,
    default: "",
  },
  age: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Unverified",
  },
});

module.exports = moongose.model("User", UserSchema);
