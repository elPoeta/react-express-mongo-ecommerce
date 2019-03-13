const mongoose = require("mongoose");
const { categorySchema } = require("./Category");
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 80,
    required: true
  },
  category: {
    type: categorySchema,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  discount: {
    type: Number,
    max: 100,
    min: 0
  },
  stock: {
    type: Number,
    min: 0,
    required: true
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 255
  },
  image: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const validateProduct = {
  product: Joi.object().keys({
    _id: Joi.objectId(),
    name: Joi.string()
      .min(2)
      .max(80)
      .required(),
    category: Joi.objectId().required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    discount: Joi.number().min(0).max(100).required(),
    image: Joi.string().required(),
    description: Joi.string()
      .min(10)
      .max(255),
    isAvailable: Joi.boolean(),

  }),
}
const Product = new mongoose.model("product", productSchema);

exports.Product = Product;
exports.validateProduct = validateProduct;
