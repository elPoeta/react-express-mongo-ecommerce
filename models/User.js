const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config/keys");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "user"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = new mongoose.model("user", userSchema);

userSchema.pre("save", async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.methods.generateAuthToken = function() {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
        isAdmin: this.isAdmin,
        role: this.role
      },
      JWT_SECRET
    );
    return token;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.User = User;
