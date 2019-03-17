const express = require('express');
const router = express.Router();
const { createPayment, executePayment } = require('../../controllers/paymentController');
const { auth } = require('../../middlewares/authorization');
const { tokenCartItems } = require('../../middlewares/cartToken');

router.post('/create-payment/:token', [auth], createPayment);
router.post('/execute-payment', [auth], executePayment);


module.exports = router;