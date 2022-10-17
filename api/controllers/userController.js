const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const userController = {
  getOne:  async (req,res) =>{
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
      
    }
  },
  getAll:  async (req,res) =>{
    try {
      let users = await User.find();
      // users = users.map((user)=>{
      // const { password, ...others } = user._doc;
      //   return others
      // })
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,
          {
            $set: req.body,
          },
          { new: true });
          const {__v,password,...others} = updateUser._doc;
        res.status(200).json(others);
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json('you can only update your account!')
    }
  
  },
  delete: async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json('user has been deleted');
        } catch (err) {
          res.status(500).json(err)
        }
      } catch (err) {
        res.status(404).json('user not found');
      }
    } else {
      res.status(401).json('you can only delete your account!')
    }
  },
};
module.exports = userController;
