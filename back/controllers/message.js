const MessageModel = require("../models/Message");
const { findMatchForUser } = require("./match");
const { emitToUser } = require("../sockets");

const MAX_LENGTH = 1000;

// Guarda el mensaje y lo emite al otro participante. Sirve a la ruta y al socket.
const createMessage = async (userId, matchId, text) => {
  if (typeof text !== "string" || text.trim() === "" || text.length > MAX_LENGTH) {
    return { status: 400, error: "Mensaje invalido" };
  }

  const match = await findMatchForUser(matchId, userId);
  if (!match) return { status: 403, error: "Sin permiso" };

  const saved = await MessageModel.create({
    message: text.trim(),
    from: String(userId),
    matchId: match._id,
  });

  const other = String(match.idUser) === String(userId) ? match.idUserDestination : match.idUser;
  emitToUser(other, "message", {
    _id: saved._id,
    matchId: String(match._id),
    message: saved.message,
    from: saved.from,
    createdAt: saved.createdAt,
  });

  return { status: 201, message: saved };
};

const saveMessage = async (req, res) => {
  try {
    const { matchId, message } = req.body;
    const result = await createMessage(req.user.id, matchId, message);

    if (result.error) return res.status(result.status).json({ message: result.error });
    res.status(201).json(result.message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const { matchId } = req.query;
    const match = await findMatchForUser(matchId, req.user.id);
    if (!match) return res.status(403).json({ message: "Sin permiso" });

    const allMessage = await MessageModel.find({ matchId: match._id }).sort({ createdAt: 1, _id: 1 });
    res.status(200).json(allMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllMessage = async (req, res) => {
  try {
    await MessageModel.deleteMany();
    res.status(200).json("Todos los mensajes fueron borrados");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveMessage, getAllMessage, deleteAllMessage, createMessage };
