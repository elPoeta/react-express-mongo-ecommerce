const { JWT_SECRET_CART } = require("../config/keys");
const JWT = require("jsonwebtoken");

module.exports = {
    tokenCartItems: async (req, res, next) => {
        // let token = req.header('cart-items');
        let { token } = req.body;
        try {
            if (!token) {
                token = JWT.sign(
                    {
                        items: { cart: [] },
                        iat: new Date().getTime(),
                        exp: new Date().setSeconds(3600)
                    },
                    JWT_SECRET_CART
                );
                if (!req.params.id) {
                    //res.header("cart-items", token);
                    return res.status(200).json(token);
                }
            }
            if (typeof token !== 'undefined') {
                //res.header("cart-items", token);
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