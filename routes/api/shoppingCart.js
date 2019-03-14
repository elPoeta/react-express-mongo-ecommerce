const express = require('express');
const router = express.Router();
const { shoppingCart, addItemCart, updateItemCart, removeItemCart, clearCart } = require('../../controllers/cartController')
const { auth } = require('../../middlewares/authorization');
const { validateParamId, schemas } = require('../../middlewares/validator');

router.get('/', auth, shoppingCart);
router.post('/:id', [validateParamId(schemas.id), auth], addItemCart);
router.put('/:id', [validateParamId(schemas.id), auth], updateItemCart);
router.delete('/id', [validateParamId(schemas.id), auth], removeItemCart);
router.delete('/', auth, clearCart);

module.exports = router;