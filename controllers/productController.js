const { Product } = require('../models/Product');
const { Category } = require('../models/Category');
const asyncMiddleware = require('../middlewares/async');

module.exports = {
    createOrUpdateProduct: asyncMiddleware(async (req, res) => {

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