const { User } = require("../models/User");

module.exports = {
  signin: async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send("Password and confirm password not equals");
    }
    try {
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        return res.status(400).send("User already registered.");
      }

      const newUser = new User({
        name,
        email,
        password
      });

      await newUser.save();
      console.log("NEW ", newUser);
      const token = newUser.generateAuthToken();

      res.header("x-auth-token", token).send(token);
    } catch (err) {
      res.status(500).send("not function");
    }
  },
  login: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Invalid email or password.");
    } catch (err) {
      res.send("error");
    }
  }
};
