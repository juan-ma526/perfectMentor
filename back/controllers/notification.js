const mongoose = require("mongoose");
const NotificationModel = require("../models/Notification");
const { UserModel } = require("../models/User");
const { ensureMatch } = require("./match");
const { emitToUser } = require("../sockets");

const involved = (userId) => ({
  $or: [{ idUser: userId }, { idUserDestination: userId }],
});

const allNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find(involved(req.user.id)).sort({ _id: -1 });
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllNotifications = async (req, res) => {
  try {
    await NotificationModel.deleteMany();
    res.status(200).send("Todas las notificaciones fueron borradas");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const notificationsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id !== String(req.user.id)) return res.status(403).json({ message: "Sin permiso" });

    const notifications = await NotificationModel.find({ idUser: id });

    if (notifications.length < 1) return res.status(400).json("El Usuario no tiene notificaciones");

    res.status(200).send(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createNotifications = async (req, res) => {
  try {
    const idUser = String(req.user.id);

    if (!mongoose.isValidObjectId(req.body.idUserDestination)) {
      return res.status(400).json({ message: "El Usuario no existe" });
    }
    const idUserDestination = String(req.body.idUserDestination).toLowerCase();
    if (idUserDestination === idUser.toLowerCase()) {
      return res.status(400).json({ message: "No puedes pedirte match a ti mismo" });
    }

    const userRte = await UserModel.findById(idUser);
    if (!userRte) return res.status(401).json({ message: "Sesion invalida" });
    if (userRte.status !== "Verified") {
      return res.status(403).json({ message: "Debes estar verificado" });
    }

    const userDestination = await UserModel.findById(idUserDestination);
    if (!userDestination) return res.status(400).json({ message: "El Usuario no existe" });
    if (userDestination.status !== "Verified") {
      return res.status(400).json({ message: "El Usuario no esta verificado" });
    }

    const own = await NotificationModel.findOne({ idUser, idUserDestination });
    const reverse = await NotificationModel.findOne({
      idUser: idUserDestination,
      idUserDestination: idUser,
    });

    // Pedido ya aceptado en alguno de los dos sentidos: solo se asegura el match
    if ((own && own.status === "check it") || (reverse && reverse.status === "check it")) {
      await ensureMatch(idUser, idUserDestination);
      return res.status(200).send(own || reverse);
    }

    // Like de vuelta (o pedidos cruzados pendientes): el match se crea solo
    if (reverse && reverse.status === "no answer" && (!own || own.status === "no answer")) {
      reverse.status = "check it";
      await reverse.save();
      if (own) {
        own.status = "check it";
        await own.save();
      }
      const { match } = await ensureMatch(idUser, idUserDestination);
      emitToUser(idUserDestination, "notification", {
        type: "match",
        matchId: String(match._id),
        idUser,
        nameUserRte: userRte.username,
        notification: reverse,
      });
      return res.status(200).send(reverse);
    }

    // Pedido repetido, o ya rechazado: no se crea otro
    if (own) return res.status(200).send(own);

    let notificationSaved;
    try {
      notificationSaved = await NotificationModel.create({
        idUserDestination,
        idUser,
        emailUserDestination: userDestination.email,
        rolUserRte: userRte.rol,
        nameUserRte: userRte.username,
        emailUserRte: userRte.email,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(200).send(await NotificationModel.findOne({ idUser, idUserDestination }));
      }
      throw error;
    }

    await UserModel.updateOne(
      { _id: userDestination._id },
      { $addToSet: { notifications: notificationSaved._id } }
    );
    await UserModel.updateOne({ _id: userRte._id }, { $addToSet: { notifications: notificationSaved._id } });

    // Like simultaneo: el otro pudo crear su pedido mientras creabamos el nuestro
    const crossed = await NotificationModel.findOne({
      idUser: idUserDestination,
      idUserDestination: idUser,
    });
    if (crossed && crossed.status !== "cancel") {
      await NotificationModel.updateMany(
        {
          status: "no answer",
          $or: [
            { idUser, idUserDestination },
            { idUser: idUserDestination, idUserDestination: idUser },
          ],
        },
        { $set: { status: "check it" } }
      );
      const { match, created } = await ensureMatch(idUser, idUserDestination);
      if (created) {
        emitToUser(idUserDestination, "notification", {
          type: "match",
          matchId: String(match._id),
          idUser,
          nameUserRte: userRte.username,
          notification: crossed,
        });
      }
      return res.status(200).send(await NotificationModel.findById(notificationSaved._id));
    }

    emitToUser(idUserDestination, "notification", {
      type: "request",
      idUser,
      nameUserRte: userRte.username,
      notification: notificationSaved,
    });

    res.status(201).send(notificationSaved);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el pedido" });
  }
};

const updateNotification = async (req, res) => {
  try {
    const { idNotification, status } = req.body;

    if (!mongoose.isValidObjectId(idNotification)) {
      return res.status(400).send({ message: "Notificacion no encontrada" });
    }

    const notification = await NotificationModel.findById(idNotification);
    if (!notification) return res.status(400).send({ message: "Notificacion no encontrada" });

    if (String(notification.idUserDestination) !== String(req.user.id)) {
      return res.status(403).send({ message: "Sin permiso" });
    }

    if (status !== "cancel" && status !== "check it") {
      return res.status(400).send({ message: "Estado no válido" });
    }

    if (status === "check it") {
      if (notification.status === "cancel") {
        return res.status(409).send({ message: "El pedido ya fue rechazado" });
      }
      if (notification.status === "no answer") {
        notification.status = "check it";
        await notification.save();
      }
      const { match, created } = await ensureMatch(notification.idUser, notification.idUserDestination);
      if (created) {
        const accepter = await UserModel.findById(req.user.id);
        emitToUser(notification.idUser, "notification", {
          type: "match",
          matchId: String(match._id),
          idUser: String(req.user.id),
          nameUserRte: accepter && accepter.username,
          notification,
        });
      }
      return res.status(created ? 201 : 200).send(match);
    }

    if (notification.status === "check it") {
      return res.status(409).send({ message: "El pedido ya fue aceptado" });
    }
    if (notification.status === "no answer") {
      notification.status = "cancel";
      await notification.save();
      emitToUser(notification.idUser, "notification", {
        type: "rejected",
        _id: String(notification._id),
        idUser: String(req.user.id),
        notification,
      });
    }
    res.status(200).send({ _id: notification._id, status: notification.status });
  } catch (error) {
    console.log(error);
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
