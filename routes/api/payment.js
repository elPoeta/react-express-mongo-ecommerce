const express = require('express');
const router = express.Router();
const { createPayment, paymentSucces, paymentCancel } = require('../../controllers/paymentController');
const { auth } = require('../../middlewares/authorization');
const { tokenCartItems } = require('../../middlewares/cartToken');

router.post('/', [auth, tokenCartItems], createPayment);
router.get('/success', [auth, tokenCartItems], paymentSucces);
router.get('/cancel', [auth], paymentCancel);

module.exports = router;