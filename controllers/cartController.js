const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product');
const asyncMiddleware = require('../middlewares/async');
const { JWT_SECRET_CART } = require("../config/keys");
const JWT = require("jsonwebtoken");

signTokenCart = (items, id) => {
    return JWT.sign(
        {
            id,
            items,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        JWT_SECRET_CART
    );
};
module.exports = {
    shoppingCart: asyncMiddleware(async (req, res) => {
        const token = req.header('cart-items');

        if (!token) {

            const cartToken = signTokenCart([], req.user._id);
            res.header("cart-items", cartToken)
            return res.status(200).json([])
        }

        const decoded = JWT.verify(token, JWT_SECRET_CART);
        req.cart = decoded;
        res.status(200).json(req.cart.items);
    }),
    addItemCart: asyncMiddleware(async (req, res) => {
        const errors = {};
        const _id = req.value.params;
        let token = req.header('cart-items');

        if (!token) {
            console.log('no token')
            //req.user.cart = new Cart({});
            token = signTokenCart([], req.user._id);
            //res.header("cart-items", token)
        }
        let decoded = JWT.verify(token, JWT_SECRET_CART);


        //req.cart = decoded;
        const cart = new Cart(Object.keys(decoded.items).length > 0 ? decoded.items.cart : []);
        const product = await Product.findById(_id);
        cart.addItemCart(product);

        //req.user.cart = cart;
        token = signTokenCart(cart, req.user._id);

        res.header("cart-items", token)
        decoded = JWT.verify(token, JWT_SECRET_CART);
        res.status(200).json(decoded.items);

    }),
    updateItemCart: asyncMiddleware(async (req, res) => {
        res.status(200).json({ msg: "update item cart" });

    }),
    removeItemCart: asyncMiddleware(async (req, res) => {
        res.status(200).json({ msg: "remove item cart" });

    }),
    clearCart: asyncMiddleware(async (req, res) => {
        res.status(200).json({ msg: "Clear cart" });

    })
}