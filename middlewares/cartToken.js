const { JWT_SECRET_CART } = require("../config/keys");
const JWT = require("jsonwebtoken");

module.exports = {
    tokenCartItems: async (req, res, next) => {
        let token = req.header('cart-items');

        try {
            if (!token) {
                token = JWT.sign(
                    {
                        id: req.user._id,
                        items: [],
                        iat: new Date().getTime(),
                        exp: new Date().setSeconds(3600)
                    },
                    JWT_SECRET_CART
                );
            }
            if (typeof token !== 'undefined') {
                res.header("cart-items", token);
                const decoded = JWT.verify(token, JWT_SECRET_CART);
                req.cart = decoded
                await next();
            }
            else {
                res.status(400).send('Invalid cart token.');
            }
        } catch (err) {
            res.status(400).send('Invalid cart token.');
        }


    },

}