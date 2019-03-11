const express = require("express");
const router = express.Router();
const { register, login, secret } = require("../../controllers/authController");
const { validateBody, schemas } = require("../../middlewares/validator");
const { auth } = require('../../middlewares/authorization');


router.post("/register", validateBody(schemas.register), register);
router.post("/login", validateBody(schemas.login), login);

router.get('/secret', auth, secret);

module.exports = router;
