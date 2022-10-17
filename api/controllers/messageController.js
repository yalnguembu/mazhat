const Message = require("../models/message.model");
const User = require("../models/user.model");

const messageController = {
  newMessage: async (req, res) => {
    try {
      let receiver = await User.findOne({ username: req.body.receiver });
      req.body.receiver = receiver._id;
      const newMessage = new Message(req.body);
      const message = newMessage.save();
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  get: async (req, res) => {
    if (req.query.receiver) {
      let sender = req.params.sender;
      let receiver = await User.findOne({ username: req.query.receiver });
      receiver = receiver._id;
      try {
        const messages = await Message.find({
          $or: [
            { $and: [{ sender: sender }, { receiver: receiver }] },
            { $and: [{ receiver: sender }, { sender: receiver }] },
          ],
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(200).json([]);
    }
  },
  getAll: async (req, res) => {
    try {
      const message = await Message.find();
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const message = await Message.findById(req.params.id);
      try {
        await message.delete();
        res.status(200).json("tache effacer");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getConversations: async (req, res) => {
    const id = req.params.id;
    try {
      const getConversation = async (users) => {
        let conversations = [];
        let filteredUsers = users.filter((user) => {
          return user !== id;
        });
        for (let i = 0; i < filteredUsers.length; i++) {
          const user = await User.findById(filteredUsers[i]);
          const message = await Message.find({
            $or: [{ sender: id }, { receiver: id }],
          });
          if (typeof user.img == undefined) {
            user.img = "default-user.jpg";
          }
          conversations[i] = {
            username: user.username,
            img: typeof user.img !== undefined && "default-user.jpg",
            message: message[message.length - 1],
          };
        }
        res.status(200).json(conversations);
      };
      const query = Message.distinct("receiver");
      query.exec(function (error, result) {
        if (error) {
          console.log(error);
          res.status(200).json([]);
        } else getConversation(result);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteConversation: async (req, res) => {
    try {
      const message = await Message.findById(req.params.id);
      try {
        await message.delete();
        res.status(200).json("message deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = messageController;
