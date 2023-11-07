const User = require("../models/Users");
const bcryp = require("bcrypt");
const { createAccesToken } = require("../lib/jwt");

const allUsers = async (req, res) => {
  const users = await User.find();

  return res.send(users);
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcryp.hash(password, 10);
    const newUser = new User({ name, email, password: passwordHash });

    const userSaved = await newUser.save();

    const token = await createAccesToken({ id: newUser._id });

    res.cookie("token", token);

    res.send({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).send({ message: "Usuario no encontrado" });

    const isMatch = await bcryp.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).send({ message: "Credencial invalida" });

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);

    res.send({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  try {
    const { rol, age } = req.body;
    const update = { rol, age };

    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).send({ message: "Usuario no encontrado" });

    const userUpdated = await userFound.updateOne(update);

    res.status(200).send({ message: "Usuario Actualizado" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { allUsers, signUp, signIn, logout, profile };
