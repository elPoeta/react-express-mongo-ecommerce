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
    id: Joi.objectId().required()
  }
};
