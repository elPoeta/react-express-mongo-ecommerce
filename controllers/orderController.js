const { Order } = require('../models/Order');
const { Product } = require('../models/Product');
const { Customer } = require('../models/Customer');
const asyncMiddleware = require('../middlewares/async');

module.exports = {
    createOrder: asyncMiddleware(async (req, res) => {
        const errors = {};
        const cart = req.cart.items;

        if (cart.length === 0) {
            errors.empty = 'Cart is empty';
            return res.status(400).json(errors);
        }
        const customer = await Customer.findOne({ user: req.user._id }).select('_id');
        if (!customer) {
            errors.notFound = 'Customer not found';
            return res.status(400).json(errors);
        }

        const order = new Order({
            customer: customer._id,
            items: cart,
            paymentId: Math.random().toString()
        });

        await order.save();
        res.status(200).json(order);
    })
}