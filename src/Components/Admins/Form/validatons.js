import Joi from 'joi';

export const Schema = Joi.object({
  name: Joi.string()
    .pattern(/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/u)
    .min(3)
    .required()
    .messages({ 'string.pattern.base': 'Must contain only letters' }),
  lastName: Joi.string()
    .pattern(/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/u)
    .min(3)
    .required()
    .messages({ 'string.pattern.base': 'Must contain only letters' }),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Must contain only letters and numbers and at least 8 characters long'
    })
});
