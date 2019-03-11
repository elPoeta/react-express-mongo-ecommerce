const express = require('express');
const router = express.Router();
const { createOrUpdateCategory, deleteCategory } = require('../../controllers/categoryController');
const { validateBody, validateParamId, schemas } = require('../../middlewares/validator');
const { auth, admin } = require('../../middlewares/authorization');

router.post('/', [validateBody(schemas.category), auth, admin], createOrUpdateCategory);
router.delete('/:id', [validateParamId(schemas.id), auth, admin], deleteCategory);

module.exports = router;