const { Category } = require("../models/Category");
const asyncMiddleware = require("../middlewares/async");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  getCategories: asyncMiddleware(async (req, res) => {
    const categories = await Category.find();
    if (!categories)
      return res.status(400).json({ errors: "Categories Not Found" });
    res.status(200).json(categories);
  }),
  getCategoryById: asyncMiddleware(async (req, res) => {
    const _id = req.value.params;
    const category = await Category.findById(_id);
    if (!category)
      return res.status(400).json({ errors: "Category not found" });
    res.status(200).json(category);
  }),
  createOrUpdateCategory: asyncMiddleware(async (req, res) => {

    const { name, description, isAvailable } = req.body;
    const _id = req.body._id || undefined;
    let categoryFields = {};

    if (name) categoryFields.name = name;
    if (description) categoryFields.description = description;
    categoryFields.isAvailable = (isAvailable !== undefined) ? isAvailable : true;

    const category = await Category.findById(_id);

    if (category) {
      const updateCategory = await Category.findByIdAndUpdate(
        { _id },
        { $set: categoryFields },
        { new: true }
      );

      return res.json(updateCategory);
    }
    const newCategory = await new Category(categoryFields).save();

    res.json(newCategory);

  }),
  deleteCategory: asyncMiddleware(async (req, res) => {
    const errors = {};
    const _id = req.value.params;
    const category = await Category.findByIdAndRemove(_id);
    if (!category) {
    errors.notFound = 'Category not found'
      return res.status(400).json(errors)
    }
    res.status(200).json({ success: true });
  })
};
