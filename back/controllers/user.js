const { UserModel } = require("../models/User");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");
const bcryp = require("bcrypt");
const nodemailer = require("nodemailer");
const { createAccesToken } = require("../lib/jwt");

const allUsers = async (req, res) => {
  const users = await UserModel.find();

  return res.send(users);
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcryp.hash(password, 10);
    const newUser = new UserModel({ username, email, password: passwordHash });

    await newUser.save();

    const token = await createAccesToken({ id: newUser._id });

    res.cookie("token", token);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await UserModel.findOne({ email });
    if (!userFound) return res.status(400).send({ message: "Correo incorrecto" });

    const isMatch = await bcryp.compare(password, userFound.password);

    if (!isMatch) return res.status(400).send({ message: "Password Incorrecto" });

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);

    res.send({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      password: userFound.password,
      status: userFound.status,
      rol: userFound.rol,
      age: userFound.age,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json(null);

    if (token) {
      jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" });

        const userFound = await UserModel.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "No autorizado" });

        return res.status(201).json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          password: userFound.password,
          status: userFound.status,
          rol: userFound.rol,
          age: userFound.age,
          status: userFound.status,
          createdAt: userFound.createdAt,
        });
      });
    } else {
      res.status(401).json(null);
    }
  } catch (error) {
    return res.status(401).json(null);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

const profile = async (req, res) => {
  try {
    const { rol, age } = req.body;
    const update = { rol, age };

    const userFound = await UserModel.findById(req.user.id);
    if (!userFound) return res.status(400).send({ message: "Usuario no encontrado" });

    const userUpdated = await userFound.updateOne(update);

    res.status(200).send({ message: "Usuario Actualizado" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const verifiedUser = async (req, res) => {
  try {
    const userFound = await UserModel.findById(req.user.id);
    if (!userFound) return res.status(400).send({ message: "Usuario no encontrado" });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS,
      },
    });

    const mailOptions = {
      from: "jmperez675@gmail.com",
      to: userFound.email,
      subject: "Verificacion de correo electronico",
      text: "Hola, gracias por registrarte en nuestro sitio web. Por favor haz clic en el siguiente enlace para verificar tu correo electrónico: http://localhost:3000/Profile",
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          message: "Ocurrio un error al enviar el correo electronico",
        });
      }
    });

    const updateUser = await UserModel.findOneAndUpdate(
      { email: userFound.email },
      { status: "Verified" },
      { new: true }
    );

    res.status(200).send({ message: "Correo enviado y actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const deleteUserbyId = async (req, res) => {
  const { id } = req.body;

  try {
    // Intentar eliminar el usuario
    const userDeleted = await UserModel.deleteOne({ _id: id });

    // Verificar si se eliminó algún usuario
    if (userDeleted.deletedCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Enviar una respuesta exitosa
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
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
  deleteUserbyId,
};
