const NotificationModel = require("../models/Notification");
const MatchModel = require("../models/Match");
const { UserModel } = require("../models/User");

const allNotifications = async (req, res) => {
  const notifications = await NotificationModel.find();
  res.status(200).send(notifications);
};

const deleteAllNotifications = async (req, res) => {
  const notifications = await NotificationModel.deleteMany();
  res.status(200).send("Todas las notificaciones fueron borradas");
};

const notificationsById = async (req, res) => {
  try {
    const { id } = req.params;

    const notifications = await NotificationModel.find({ idUser: id });

    if (notifications.length < 1) return res.status(400).json("El Usuario no tiene notificaciones");

    res.status(200).send(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createNotifications = async (req, res) => {
  const { idUserDestination, idUser } = req.body;

  const userDestination = await UserModel.findById(idUserDestination);
  if (!userDestination) return res.status(400).json({ message: "El Usuario no existe" });

  const userRte = await UserModel.findById(idUser);
  if (!userRte) return res.status(400).json({ message: "El Usuario no existe" });

  const newNotification = new NotificationModel({
    idUserDestination: idUserDestination,
    idUser: idUser,
    rolUserRte: userRte.rol,
    nameUserRte: userRte.username,
    emailUserRte: userRte.email,
  });

  try {
    const notificationSaved = await newNotification.save();
    userDestination.notifications = userDestination.notifications.concat(notificationSaved._id);
    userRte.notifications = userRte.notifications.concat(notificationSaved._id);

    await userDestination.save();
    await userRte.save();

    res.status(200).send(notificationSaved);
  } catch (error) {
    console.log(error);

    res.status(401).send("Error al crear el match");
  }
};

const updateNotification = async (req, res) => {
  try {
    const { idNotification, status } = req.body;

    const notification = await NotificationModel.findById(idNotification);

    if (!notification) {
      return res.status(400).send({ message: "Notificacion no encontrada" });
    } else {
      const userDestination = await UserModel.findById(notification.idUserDestination);
      const userRte = await UserModel.findById(notification.idUser);

      if (status === "cancel") {
        await NotificationModel.updateOne({ _id: idNotification }, { status: status });

        res.status(200).send("Notificacion Actualizada");
      } else if (status === "check it") {
        try {
          // Actualiza la notificación
          await NotificationModel.updateOne({ _id: idNotification }, { status: status });

          // Crea un nuevo match
          const newMatch = new MatchModel({
            idUserDestination: userDestination._id,
            idUser: userRte._id,
            usernameDestination: userDestination.username,
            emailDestination: userDestination.email,
            roleDestination: userDestination.rol,
            status: "match",
          });

          // Guarda el nuevo match
          const matchSaved = await newMatch.save();

          // Actualiza los usuarios con el nuevo match
          userDestination.matchs.push(matchSaved._id);
          userRte.matchs.push(matchSaved._id);

          await userDestination.save();
          await userRte.save();

          res.status(201).send(matchSaved);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "Error al crear el match" });
        }
      } else {
        res.status(400).send({ message: "Estado no válido" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  allNotifications,
  notificationsById,
  createNotifications,
  updateNotification,
  deleteAllNotifications,
};
