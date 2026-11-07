// Crea (o repone) dos usuarios de prueba verificados y uno de control.
// Uso: MONGO_URL=mongodb://localhost:27017/<base> node scripts/crearUsuariosPrueba.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User");

const PASSWORD = "Prueba1234";

const usuarios = [
  { username: "usuario1", email: "usuario1@prueba.test", rol: "mentor" },
  { username: "usuario2", email: "usuario2@prueba.test", rol: "mentee" },
  { username: "control", email: "control@prueba.test", rol: "mentee" },
];

const main = async () => {
  if (!process.env.MONGO_URL) throw new Error("Falta la variable MONGO_URL");

  await mongoose.connect(process.env.MONGO_URL);
  const password = await bcrypt.hash(PASSWORD, 10);

  for (const u of usuarios) {
    await UserModel.findOneAndUpdate(
      { email: u.email },
      { $set: { ...u, password, status: "Verified" } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`Listo: ${u.email} (${PASSWORD})`);
  }
};

main()
  .then(() => mongoose.disconnect())
  .catch(async (error) => {
    console.error(error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
