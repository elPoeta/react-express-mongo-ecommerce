const express = require('express');
const router = express.Router();
const { createOrUpdateProduct } = require('../../controllers/productController');
const { validateBody, validateParamId, schemas } = require('../../middlewares/validator');
const { validateProduct } = require('../../models/Product');
const { auth, admin } = require('../../middlewares/authorization');

router.post('/', [validateBody(validateProduct.product), auth, admin], createOrUpdateProduct);

module.exports = router;