const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../../controllers/productController');
const { validateBody, validateParamId, schemas } = require('../../middlewares/validator');
const { validateProduct } = require('../../models/Product');


router.get('/', getProducts);
router.get('/:id', validateParamId(schemas.id), getProductById);

module.exports = router;