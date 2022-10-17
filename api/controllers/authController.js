const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const authController = {
  login:  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (!validate || !user) {
        res.status(400).json("mot de passe ou email incorecte");
      } else {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  
  },
  register:async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      //hashage du mot de passe avec la cle de hashage transmise en param et le mot de pass a hasher
      const hahsedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hahsedPassword,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
module.exports = authController;
