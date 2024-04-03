const MatchModel = require("../models/Match");
const { UserModel } = require("../models/User");

const allMatch = async (req, res) => {
  const matchs = await MatchModel.find();
  res.send(matchs);
};

const deleteAllMatch = async (req, res) => {
  const matchs = await MatchModel.deleteMany();

  res.status(200).json("Todos los matchs borrados");
};

const findMatchById = async (req, res) => {
  try {
    const { id } = req.params;

    const matchs = await MatchModel.find({ idUser: id });

    if (matchs.length < 1) {
      return res.status(400).json("El Usuario no tiene matchs");
    } else {
      res.status(200).json(matchs);
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
};
