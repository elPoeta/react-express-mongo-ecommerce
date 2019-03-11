const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById
} = require("../../controllers/categoryController");
const { validateParamId, schemas } = require("../../middlewares/validator");

router.get("/", getAllCategories);
router.get("/:id", validateParamId(schemas.id), getCategoryById);

module.exports = router;
