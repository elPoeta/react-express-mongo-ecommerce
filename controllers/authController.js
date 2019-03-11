const { User } = require("../models/User");

module.exports = {
  register: async (req, res) => {
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

      const user = await newUser.save();

      const token = `Bearer ${user.generateAuthToken()}`;

      res.header('authorization', token).status(200).send(token);

    } catch (err) {
      res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).send("Invalid email or password.");

      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) return res.status(400).send('Invalid email or password.');

      const token = `Bearer ${user.generateAuthToken()}`;

      res.header('authorization', token).status(200).send(token);

    } catch (err) {
      res.send("error");
    }
  },
  secret: async (req, res) => {
    res.status(200).json({ message: "secret page!!" });
  }
};
