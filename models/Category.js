const mongoose = require('mongoose');
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 255
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

const Category = new mongoose.model('category', categorySchema);
const validateCategory = {
    category: Joi.object().keys({
        _id: Joi.objectId(),
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        description: Joi.string()
            .min(10)
            .max(255),
        isAvailable: Joi.boolean()
    })
}
exports.validateCategory = validateCategory;
exports.categorySchema = categorySchema;
exports.Category = Category;