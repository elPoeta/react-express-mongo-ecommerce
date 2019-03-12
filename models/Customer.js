const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi');

const customerSchema = new Schema({
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
          min: 0,
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
  }
});
const validateCustomer = {
  customer: Joi.object().keys({
    _id: Joi.objectId(),
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
  }),
  address: Joi.object().keys({
    _id: Joi.objectId(),
    street: Joi.string()
      .min(5)
      .max(255)
      .required(),
    location: Joi.string()
      .min(5)
      .max(255)
      .required(),
    number: Joi.number().min(0).required(),
  })
}
const Customer = new mongoose.model("customer", customerSchema);

exports.validateCustomer = validateCustomer;
exports.Customer = Customer;

