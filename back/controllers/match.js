const mongoose = require("mongoose");
const MatchModel = require("../models/Match");
const { UserModel } = require("../models/User");

const pairKeyOf = (a, b) => [String(a).toLowerCase(), String(b).toLowerCase()].sort().join("_");

// Match del par: por pairKey, o por los dos ids (matches viejos sin pairKey, que se completan)
const findPairMatch = async (idUser, idUserDestination, pairKey) => {
  const found = await MatchModel.findOne({
    $or: [
      { pairKey },
      { idUser, idUserDestination },
      { idUser: idUserDestination, idUserDestination: idUser },
    ],
  }).sort({ _id: 1 });
  if (found && !found.pairKey) {
    try {
      await MatchModel.updateOne({ _id: found._id, pairKey: { $exists: false } }, { $set: { pairKey } });
      found.pairKey = pairKey;
    } catch (error) {
      if (error.code !== 11000) throw error;
    }
  }
  return found;
};

// Completa los nombres de matches viejos que no guardaron los datos de quien pidio
const withNames = async (matchs) => {
  const missing = matchs.some((m) => !m.usernameUser || !m.usernameDestination);
  if (!missing) return matchs;
  const ids = matchs.flatMap((m) => [m.idUser, m.idUserDestination]);
  const users = await UserModel.find({ _id: { $in: ids } }).select("username email rol");
  const byId = new Map(users.map((u) => [String(u._id), u]));
  return matchs.map((m) => {
    const obj = m.toObject();
    const user = byId.get(String(m.idUser));
    const destination = byId.get(String(m.idUserDestination));
    if (user) {
      obj.usernameUser = obj.usernameUser || user.username;
      obj.emailUser = obj.emailUser || user.email;
      obj.roleUser = obj.roleUser || user.rol;
    }
    if (destination) {
      obj.usernameDestination = obj.usernameDestination || destination.username;
      obj.emailDestination = obj.emailDestination || destination.email;
      obj.roleDestination = obj.roleDestination || destination.rol;
    }
    return obj;
  });
};

const forMember = (userId) => ({
  $or: [{ idUser: userId }, { idUserDestination: userId }],
});

// Crea el match del par si no existe. Devuelve { match, created }.
const ensureMatch = async (idUser, idUserDestination) => {
  const pairKey = pairKeyOf(idUser, idUserDestination);

  const existing = await findPairMatch(idUser, idUserDestination, pairKey);
  if (existing) return { match: existing, created: false };

  const [user, destination] = await Promise.all([
    UserModel.findById(idUser),
    UserModel.findById(idUserDestination),
  ]);

  try {
    const match = await MatchModel.create({
      idUser: user._id,
      idUserDestination: destination._id,
      usernameUser: user.username,
      emailUser: user.email,
      roleUser: user.rol,
      usernameDestination: destination.username,
      emailDestination: destination.email,
      roleDestination: destination.rol,
      pairKey,
      status: "match",
    });

    await UserModel.updateOne({ _id: user._id }, { $addToSet: { matchs: match._id } });
    await UserModel.updateOne({ _id: destination._id }, { $addToSet: { matchs: match._id } });

    return { match, created: true };
  } catch (error) {
    if (error.code === 11000) {
      return { match: await findPairMatch(idUser, idUserDestination, pairKey), created: false };
    }
    throw error;
  }
};

// Devuelve el match solo si userId es parte; si no, null.
const findMatchForUser = async (matchId, userId) => {
  if (!mongoose.isValidObjectId(matchId)) return null;
  return MatchModel.findOne({ _id: matchId, ...forMember(userId) });
};

const allMatch = async (req, res) => {
  try {
    const matchs = await MatchModel.find(forMember(req.user.id)).sort({ _id: 1 });
    res.send(await withNames(matchs));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllMatch = async (req, res) => {
  try {
    await MatchModel.deleteMany();
    res.status(200).json("Todos los matchs borrados");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findMatchById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id !== String(req.user.id)) return res.status(403).json({ message: "Sin permiso" });

    const matchs = await MatchModel.find(forMember(id));

    if (matchs.length < 1) {
      return res.status(400).json("El Usuario no tiene matchs");
    } else {
      res.status(200).json(await withNames(matchs));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  allMatch,
  deleteAllMatch,
  findMatchById,
  ensureMatch,
  findMatchForUser,
};
