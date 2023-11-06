const moongose = require("mongoose");

const client = moongose
  .connect(
    "mongodb+srv://jmperez675:test12768333@trellodb.4w3uytu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Estas conectado a la db"))
  .catch((error) => console.log(error));

module.exports = client;
