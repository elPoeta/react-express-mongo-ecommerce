const mongoose = require("mongoose");
const { categorySchema } = require("./Category");

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

const Product = new mongoose.model("product", productSchema);

exports.Product = Product;
