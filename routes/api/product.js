const express = require('express');
const router = express.Router();
const { validateBody, validateParamId, schemas } = require('../../middlewares/validator');
const { validateProduct } = require('../../models/Product');


router.get('/');

module.exports = router;