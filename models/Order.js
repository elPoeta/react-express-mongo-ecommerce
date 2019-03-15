const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customer"
  },
  cart: {
    type: Object,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  }
});

const validateOrder = {
  order: Joi.object().keys({
    _id: Joi.objectId(),
    customer: Joi.objectId(),
    cart: Joi.object().required(),
    paymentId: Joi.string().required()
  })
};

const Order = new mongoose.model("order", orderSchema);

exports.Order = Order;
exports.validateOrder = validateOrder;
