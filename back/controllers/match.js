const MatchModel = require("../models/Match");

const allMatch = async (req, res) => {
  const matchs = await MatchModel.find();
  res.send(matchs);
};

const createMatch = async (req, res) => {
  const { idUserDestination, user } = req.body;
  console.log(idUserDestination, "user1");
  console.log(user, "user");
  const match = new MatchModel({
    idUserDestination,
    user,
  });

  await match.save();

  res.send(match);
};

module.exports = {
  allMatch,
  createMatch,
};
