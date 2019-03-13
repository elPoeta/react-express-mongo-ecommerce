const express = require('express');
const router = express.Router();
const { createOrUpdateCustomer, addCustomerAddress, getCustomer, deleteCustomer, deleteCustomerAddress } = require('../../controllers/customerController');
const { validateBody, validateParamId, schemas } = require('../../middlewares/validator');
const { validateCustomer } = require('../../models/Customer');
const { auth } = require('../../middlewares/authorization');

router.post('/', [validateBody(validateCustomer.customer), auth], createOrUpdateCustomer);
router.post('/address', [validateBody(validateCustomer.address), auth], addCustomerAddress);
router.get('/', [auth], getCustomer);
router.delete('/:id', [validateParamId(schemas.id), auth], deleteCustomer);
router.delete('/address/:id', [validateParamId(schemas.id), auth], deleteCustomerAddress);

module.exports = router;