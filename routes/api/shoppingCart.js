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

router.post("/", [tokenCartItems], shoppingCart);
router.post("/:id", [validateParamId(schemas.id), tokenCartItems], addItemCart);
router.put(
  "/:id",
  [validateParamId(schemas.id), tokenCartItems],
  updateAndRemoveItemCart
);
router.delete("/:id", [validateParamId(schemas.id), tokenCartItems], removeItemCart);
router.delete("/", [tokenCartItems], clearCart);

module.exports = router;
