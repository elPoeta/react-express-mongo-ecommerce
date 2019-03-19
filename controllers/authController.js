const { User } = require("../models/User");
const asyncMiddleware = require("../middlewares/async");

module.exports = {
  register: asyncMiddleware(async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json(`"invalid" Password and confirm password not equals`);
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json(`"exist" User already registered.`);
    }

    const newUser = new User({
      email,
      password
    });

    const user = await newUser.save();

    const token = `Bearer ${user.generateAuthToken()}`;

    res
      .header("authorization", token)
      .status(200)
      .send(token);
  }),
  login: asyncMiddleware(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json(`"invalid" email or password.`);

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword)
      return res.status(400).json(`"invalid" email or password.`);

    const token = `Bearer ${user.generateAuthToken()}`;
    console.log("token ", token);
    res
      .header("authorization", token)
      .status(200)
      .json({ token });
  }),
  secret: async (req, res) => {
    res.status(200).json({ message: "secret page!!" });
  }
};
