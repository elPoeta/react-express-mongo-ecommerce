const express = require("express");
const router = express.Router();
const {
  shoppingCart,
  addItemCart,
  updateAndRemoveItemCart,
  removeItemCart,
  clearCart
} = require("../../controllers/cartController");
const { auth } = require("../../middlewares/authorization");
const { validateParamId, schemas } = require("../../middlewares/validator");
const { tokenCartItems } = require("../../middlewares/cartToken");

router.get("/", [auth, tokenCartItems], shoppingCart);
router.post("/:id", [validateParamId(schemas.id), auth, tokenCartItems], addItemCart);
router.put(
  "/:id",
  [validateParamId(schemas.id), auth, tokenCartItems],
  updateAndRemoveItemCart
);
router.delete("/:id", [validateParamId(schemas.id), auth, tokenCartItems], removeItemCart);
router.delete("/", [auth, tokenCartItems], clearCart);

module.exports = router;
