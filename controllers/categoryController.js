const { Category } = require('../models/Category');
const asyncMiddleware = require('../middlewares/async');
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    createOrUpdateCategory: asyncMiddleware(async (req, res) => {
        let errors = {};

        const { name, description, isAvailable } = req.body;
        const _id = req.body._id || undefined;
        let categoryFields = {};

        if (name) categoryFields.name = name;
        if (description) categoryFields.description = description;
        if (isAvailable !== undefined) categoryFields.isAvailable = isAvailable;

        const category = await Category.findById(_id);

        if (category) {

            const updateCategory = await Category
                .findByIdAndUpdate(
                    { _id },
                    { $set: categoryFields },
                    { new: true }
                );

            return res.json(updateCategory);
        } else {

            const category = await Category.findById(_id);
            if (category) {

                errors.id = 'That id already exists';
                return res.status(400).json(errors);
            }

            const newCategory = await new Category(categoryFields).save();

            res.json(newCategory);
        }


    }),
    deleteCategory: asyncMiddleware(async (req, res) => {
        const _id = req.value.params;
        //const userId = req.user._id

        const category = await Category.findByIdAndRemove(_id);
        if (!category) return res.status(400).send({ errors: "Category not found" });
        res.status(200).json({ success: true });


    }),
}
