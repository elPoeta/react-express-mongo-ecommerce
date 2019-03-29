const express = require("express");
const router = express.Router();
const {
  createOrUpdateProduct,
  deleteProduct,
  getProductByIdToEdit
} = require("../../controllers/productController");
const {
  validateBody,
  validateParamId,
  schemas
} = require("../../middlewares/validator");
const { validateProduct } = require("../../models/Product");
const { auth, admin } = require("../../middlewares/authorization");

router.post(
  "/",
  [validateBody(validateProduct.product), auth, admin],
  createOrUpdateProduct
);
router.get(
  "/:id",
  [validateParamId(schemas.id), auth, admin],
  getProductByIdToEdit
);
router.delete(
  "/:id",
  [validateParamId(schemas.id), auth, admin],
  deleteProduct
);

module.exports = router;
