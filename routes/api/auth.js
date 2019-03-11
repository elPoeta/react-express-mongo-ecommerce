const express = require("express");
const router = express.Router();
const { signin, login } = require("../../controllers/authController");
const { validateBody, schemas } = require("../../middlewares/validator");
router.post("/signin", validateBody(schemas.signin), signin);
router.post("/login", login);

module.exports = router;
