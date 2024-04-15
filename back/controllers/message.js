const MessageModel = require("../models/Message");

const saveMessage = async (req, res) => {
  try {
    const { message, from } = req.body;

    const newMessage = new MessageModel({ message, from });
    console.log(newMessage);

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllMessage = async (req, res) => {
  const allMessage = await MessageModel.find().sort({ _id: -1 });

  if (!allMessage) {
    return res.status(400).json("No hay mensajes");
  }
  res.status(200).json(allMessage);
};

const deleteAllMessage = async (req, res) => {
  const messages = await MessageModel.deleteMany();
  res.status(200).json("Todos los mensajes fueron borrados");
};

module.exports = { saveMessage, getAllMessage, deleteAllMessage };
