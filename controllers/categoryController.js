const { Category } = require('../models/Category');
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    createOrUpdateCategory: async (req, res) => {
        let errors = {};

        const { name, description, isAvailable } = req.body;
        const _id = req.body._id || undefined;
        let categoryFields = {};

        if (name) categoryFields.name = name;
        if (description) categoryFields.description = description;
        if (isAvailable !== undefined) categoryFields.isAvailable = isAvailable;

        try {
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
        } catch (error) {
            console.log('error')
            res.status(404).json(error);
        }

    },
    deleteCategory: async (req, res) => {
        res.status(200).json({ msj: 'delete', id: req.params.id });
    },
}