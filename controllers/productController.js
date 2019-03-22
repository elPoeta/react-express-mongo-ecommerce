const { Product } = require("../models/Product");
const { Category } = require("../models/Category");
const asyncMiddleware = require("../middlewares/async");

module.exports = {
  createOrUpdateProduct: asyncMiddleware(async (req, res) => {
    const errors = {};
    const { _id } = req.body || undefined;
    const {
      name,
      price,
      categoryId,
      description,
      isAvailable,
      stock,
      discount,
      image
    } = req.body;
    const productFields = {};

    if (name) productFields.name = name;
    if (price) productFields.price = price;
    if (stock) productFields.stock = stock;
    if (description) productFields.description = description;
    if (image) productFields.image = image;
    if (discount) productFields.discount = discount;
    productFields.isAvailable = isAvailable !== undefined ? isAvailable : true;

    const categoryFound = await Category.findById({ _id: categoryId });
    if (!categoryFound) {
      errors.notFound = "Category  not found";
      return res.status(404).json(errors);
    }

    productFields.category = {};
    productFields.category.name = categoryFound.name;
    productFields.category.isAvailable = categoryFound.isAvailable;

    const product = await Product.findById(_id);
    if (product) {
      const updateProduct = await Product.findByIdAndUpdate(
        { _id },
        { $set: productFields },
        { new: true }
      );
      return res.status(200).json(updateProduct);
    }

    const updateProduct = await new Product(productFields).save();

    res.status(200).json(updateProduct);
  }),
  getProducts: asyncMiddleware(async (req, res) => {
    const errors = {};
    const products = await Product.find({ isAvailable: true }).select([
      "name",
      "price",
      "stock",
      "discount",
      "image",
      "category.name"
    ]);
    if (!products) {
      errors.notFound = "Products not found";
      return res.status(404).json(errors);
    }
    res.status(200).json(products);
  }),
  getProductByCategory: asyncMiddleware(async (req, res) => {
    const errors = {};
    const category = req.params.category;
    const product = await Product.find({
      "category.name": category,
      isAvailable: true
    }).select(["name", "price", "stock", "discount", "image", "category.name"]);
    if (!product) {
      errors.notFound = "Product not found";
      return res.status(404).json(errors);
    }
    res.status(200).json(product);
  }),
  getProductById: asyncMiddleware(async (req, res) => {
    const errors = {};
    const _id = req.value.params;
    const product = await Product.findById({
      _id,
      isAvailable: true,
      stock: { $gt: 0 }
    }).select(["name", "price", "stock", "discount", "image", "description"]);
    if (!product) {
      errors.notFound = "Product not found";
      return res.status(404).json(errors);
    }
    res.status(200).json(product);
  }),
  deleteProduct: asyncMiddleware(async (req, res) => {
    const errors = {};
    const _id = req.value.params;
    const product = await Product.findByIdAndRemove(_id);
    if (!product) {
      errors.notFound = "Product not found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ success: true });
  })
};
