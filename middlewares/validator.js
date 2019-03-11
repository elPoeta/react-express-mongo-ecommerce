const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const { error, value } = Joi.validate(req.body, schema);
      if (error) {
        return res.status(400).json(error.details[0].message);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = value;
      next();
    };
  },

  schemas: {
    signin: Joi.object().keys({
      name: Joi.string()
        .min(1)
        .max(50)
        .required(),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(8)
        .max(255)
        .required(),
      confirmPassword: Joi.string()
        .min(8)
        .max(255)
        .required()
    })
  }
};
