const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  address: {
    type: [
      {
        street: {
          type: String,
          minlength: 5,
          maxlength: 255,
          required: true
        },
        number: {
          type: Number,
          required: true
        },
        location: {
          type: String,
          minlength: 5,
          maxlength: 255,
          required: true
        }
      }
    ],
    required: true
  }
});

const Customer = new mongoose.model("customer", customerSchema);

exports.Customer = Customer;
