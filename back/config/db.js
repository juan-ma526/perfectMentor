require("dotenv").config();
const moongose = require("mongoose");

const client = moongose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Estas conectado a la db"))
  .catch((error) => console.log(error));

module.exports = client;
