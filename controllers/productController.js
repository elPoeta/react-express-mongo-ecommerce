const { Product } = require('../models/Product');
const { Category } = require('../models/Category');
const asyncMiddleware = require('../middlewares/async');

module.exports = {
    createOrUpdateProduct: asyncMiddleware(async (req, res) => {
        const errors = {};
        const { _id } = req.body || undefined;
        const { name, price, categoryId, description, isAvailable, stock, discount, image } = req.body;
        const productFields = {};

        if (name) productFields.name = name;
        if (price) productFields.price = price;
        if (stock) productFields.stock = stock;
        if (description) productFields.description = description;
        if (image) productFields.image = image;
        if (discount) productFields.discount = discount;
        productFields.isAvailable = (isAvailable !== undefined) ? isAvailable : true;

        const categoryFound = await Category.findById({ _id: categoryId });
        if (!categoryFound) {
            errors.notFound = 'Category  not found';
            return res.status(404).json(errors);
        }
        productFields.category = {
            name: categoryFound.name,
            isAvailable: categoryFound.isAvailable
        }

        const product = await Product.findById(_id);
        if (product) {
            //const updateProduct = Product.findByIdAndUpdate(_id);
            product.name = name;
            product.category.name = categoryFound.name;
            product.category.isAvailable = categoryFound.isAvailable;
            product.price = price;
            product.stock = stock;
            product.image = image;
            product.isAvailable = productFields.isAvailable;
            product.discount = discount || undefined;
            product.description = description || undefined;
            await product.save();
            return res.status(200).json(product);
        }
        console.log('###')
        const updateProduct = await new Product(productFields).save();

        res.status(200).json(updateProduct);
    }),
    getProducts: asyncMiddleware(async (req, res) => {
        //TODO
    }),
    getProductById: asyncMiddleware(async (req, res) => {
        //TODO

    }),
    deleteProduct: asyncMiddleware(async (req, res) => {
        //TODO

    })

}