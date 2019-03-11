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
  validateParamId: schema => {
    return (req, res, next) => {
      const { error, value } = Joi.validate(req.params.id.toString(), schema);
      console.log(value)
      if (error) {
        return res.status(400).json(error.details[0].message);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["params"] = value;
      next();
    };
  },

  schemas: {
    id: Joi.objectId().required(),
    register: Joi.object().keys({
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
    }),

    login: Joi.object().keys({
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(8)
        .max(255)
        .required()
    }),
    category: Joi.object().keys({
      name: Joi.string()
        .min(3)
        .max(50)
        .required(),
      description: Joi.string()
        .min(10)
        .max(255),
      isAvailable: Joi.boolean()
    }),

  },

};
