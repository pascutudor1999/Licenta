const Joi = require('@hapi/joi');


const registerValidation = data => {
    const schemaa = {
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
      };
      return Joi.validate(data, schemaa);
}

const loginValidation = data => {
  const schemaa = {
    email: Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(6)
    .required()
  };
  return Joi.validate(data, schemaa);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;