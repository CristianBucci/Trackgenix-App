import Joi from 'joi';

export const Schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Must contain only letters and numbers and at least 8 characters long'
    })
});
