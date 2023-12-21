const MatchModel = require("../models/Match");
const { UserModel } = require("../models/User");

const allMatch = async (req, res) => {
  const matchs = await MatchModel.find();
  res.send(matchs);
};

const createMatch = async (req, res) => {
  const { idUserDestination, user } = req.body;

  const userDestination = await UserModel.findById(idUserDestination);
  const userLocal = await UserModel.findById(user);

  const newMatch = new MatchModel({
    idUserDestination: idUserDestination,
    user: user,
    username: userDestination.username,
    email: userDestination.email,
    rol: userDestination.rol,
  });

  try {
    const matchSaved = await newMatch.save();
    userDestination.matchs = userDestination.matchs.concat(matchSaved._id);
    userLocal.matchs = userLocal.matchs.concat(matchSaved._id);

    await userDestination.save();
    await userLocal.save();

    res.status(200).send(matchSaved);
  } catch (error) {
    console.log(error);

    res.status(401).send("Error al crear el match");
  }
};

module.exports = {
  allMatch,
  createMatch,
};
