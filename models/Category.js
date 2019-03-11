const mongoose = require('mongoose');

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

exports.Category = Category;