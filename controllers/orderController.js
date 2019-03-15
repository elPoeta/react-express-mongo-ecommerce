const { Order } = require('../models/Order');
const { Product } = require('../models/Product');
const asyncMiddleware = require('../middlewares/async');

module.exports = {
    createOrder: asyncMiddleware(async (req, res) => {
        const cart = req.cart.items;
        res.status(200).json(cart);
    })
}