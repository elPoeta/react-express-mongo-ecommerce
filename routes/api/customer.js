const express = require('express');
const router = express.Router();
const { createOrUpdateCustomer, addCustomerAddress, getCustomer, deleteCustomer } = require('../../controllers/customerController');
const { validateBody, validateParamId, schemas } = require('../../middlewares/validator');
const { validateCustomer } = require('../../models/Customer');
const { auth } = require('../../middlewares/authorization');

router.post('/', [validateBody(validateCustomer.customer), auth], createOrUpdateCustomer);
router.post('/add-address', [validateBody(validateCustomer.address), auth], addCustomerAddress);
router.get('/', [auth], getCustomer);
router.delete('/:id', [validateParamId(schemas.id), auth], deleteCustomer)

module.exports = router;