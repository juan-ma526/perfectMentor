const { UserModel } = require("../models/User");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");
const bcryp = require("bcrypt");
const nodemailer = require("nodemailer");
const { createAccesToken } = require("../lib/jwt");

const allUsers = async (req, res) => {
  try {
    const { page } = req.query;

    const options = {
      page: Number(page) || 1,
      limit: 6,
    };

    const users = await UserModel.paginate({}, options);

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createMany = async (req, res) => {
  const seed = async () => {
    try {
      let users = await UserModel.create([
        {
          username: "test10",
          email: "test10@mail.com",
          password: "1234",
        },
        {
          username: "test11",
          email: "test11@mail.com",
          password: "1234",
        },
        {
          username: "test12",
          email: "test12@mail.com",
          password: "1234",
        },
        {
          username: "test13",
          email: "test13@mail.com",
          password: "1234",
        },
        {
          username: "test14",
          email: "test14@mail.com",
          password: "1234",
        },
        {
          username: "test15",
          email: "test15@mail.com",
          password: "1234",
        },
        {
          username: "test16",
          email: "test16@mail.com",
          password: "1234",
        },
        {
          username: "test17",
          email: "test17@mail.com",
          password: "1234",
        },
        {
          username: "test18",
          email: "test18@mail.com",
          password: "1234",
        },
        {
          username: "test19",
          email: "test19@mail.com",
          password: "1234",
        },
        {
          username: "test20",
          email: "test20@mail.com",
          password: "1234",
        },
        {
          username: "test21",
          email: "test21@mail.com",
          password: "1234",
        },
        {
          username: "test22",
          email: "test22@mail.com",
          password: "1234",
        },
        {
          username: "test23",
          email: "test23@mail.com",
          password: "1234",
        },
        {
          username: "test24",
          email: "test24@mail.com",
          password: "1234",
        },
        {
          username: "test25",
          email: "test25@mail.com",
          password: "1234",
        },
        {
          username: "test26",
          email: "test26@mail.com",
          password: "1234",
        },
        {
          username: "test27",
          email: "test27@mail.com",
          password: "1234",
        },
        {
          username: "test28",
          email: "test28@mail.com",
          password: "1234",
        },
        {
          username: "test29",
          email: "test29@mail.com",
          password: "1234",
        },
      ]);
    } catch (error) {
      throw error;
    }
    return seed;
  };
  const users = await seed();
  res.json("Seed ejecutado con exito");
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
  createMany,
  signUp,
  signIn,
  logout,
  profile,
  verifiedUser,
  verifyToken,
  deleteUserbyId,
};
