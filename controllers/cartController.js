const { Cart } = require("../models/Cart");
const { Product } = require("../models/Product");
const asyncMiddleware = require("../middlewares/async");
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
    const token = req.header("cart-items");

    if (!token) {
      const cartToken = signTokenCart([], req.user._id);
      res.header("cart-items", cartToken);
      return res.status(200).json({ cart: [] });
    }
    res.header("cart-items", token);
    const decoded = JWT.verify(token, JWT_SECRET_CART);
    res.status(200).json(decoded.items);
  }),
  addItemCart: asyncMiddleware(async (req, res) => {
    const errors = {};
    const _id = req.value.params;
    let token = req.header("cart-items");

    if (!token) {
      token = await signTokenCart([], req.user._id);
    }
    let decoded = await JWT.verify(token, JWT_SECRET_CART);
    const cart = new Cart(
      Object.keys(decoded.items).length > 0 ? decoded.items.cart : []
    );
    const product = await Product.findById(_id);
    cart.addItemCart(product);
    token = signTokenCart(cart, req.user._id);
    res.header("cart-items", token);
    decoded = JWT.verify(token, JWT_SECRET_CART);
    res.status(200).json(decoded.items);
  }),
  updateAndRemoveItemCart: asyncMiddleware(async (req, res) => {
    const errors = {};
    const _id = req.value.params;
    let token = req.header("cart-items");

    if (!token) {
      token = await signTokenCart([], req.user._id);
    }
    let decoded = await JWT.verify(token, JWT_SECRET_CART);
    const cart = new Cart(
      Object.keys(decoded.items).length > 0 ? decoded.items.cart : []
    );
    // const product = await Product.findById(_id);
    cart.removeItem(_id, "-");
    token = signTokenCart(cart, req.user._id);
    res.header("cart-items", token);
    decoded = JWT.verify(token, JWT_SECRET_CART);
    res.status(200).json(decoded.items);
  }),
  removeItemCart: asyncMiddleware(async (req, res) => {
    const errors = {};
    const _id = req.value.params;
    let token = req.header("cart-items");

    if (!token) {
      token = await signTokenCart([], req.user._id);
    }
    let decoded = await JWT.verify(token, JWT_SECRET_CART);
    const cart = new Cart(
      Object.keys(decoded.items).length > 0 ? decoded.items.cart : []
    );
    //const product = await Product.findById(_id);
    console.log("remove");
    cart.removeItemCart(_id);
    token = signTokenCart(cart, req.user._id);
    res.header("cart-items", token);
    decoded = JWT.verify(token, JWT_SECRET_CART);
    res.status(200).json(decoded.items);
  }),
  clearCart: asyncMiddleware(async (req, res) => {
    res.status(200).json({ msg: "Clear cart" });
  })
};
