const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");
const bcryp = require("bcrypt");
const nodemailer = require("nodemailer");
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

const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).send({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).send({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).send({ message: "No autorizado" });

    return res.send({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      rol: userFound.rol,
      age: userFound.age,
      status: userFound.status,
      createdAt: userFound.createdAt,
    });
  });
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200).send({ message: "Te deslogeaste exitosamente" });
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
//ozyq olkc xqba nueb
const verifiedUser = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "jmperez675@gmail.com",
        pass: "ozyq olkc xqba nueb",
      },
    });

    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).send({ message: "Usuario no encontrado" });

    const mailOptions = {
      from: "jmperez675@gmail.com",
      to: userFound.email,
      subject: "Verificacion de correo electronico",
      text: "Hola, gracias por registrarte en nuestro sitio web. Por favor haz clic en el siguiente enlace para verificar tu correo electrónico: http://localhost:3000/Profile",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Ocurrio un error al enviar el correo electronico",
        });
      } else {
        console.log("Correo electronico enviado " + info.response);
      }
    });

    const updateUser = await User.findOneAndUpdate(
      { email: userFound.email },
      { status: "Verified" },
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Correo enviado y actualizado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allUsers,
  signUp,
  signIn,
  logout,
  profile,
  verifiedUser,
  verifyToken,
};
