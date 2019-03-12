const express = require('express');
const router = express.Router();
const { createOrUpdateCustomer, addCustomerAddress } = require('../../controllers/customerController');
const { validateBody, validateParamId, schemas } = require('../../middlewares/validator');
const { validateCustomer } = require('../../models/Customer');
const { auth } = require('../../middlewares/authorization');

router.post('/', [validateBody(validateCustomer.customer), auth], createOrUpdateCustomer);

module.exports = router;