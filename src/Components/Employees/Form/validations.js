import Joi from 'joi';

export const employeeSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .messages({
      'string.pattern.base': 'All characters must be letters.'
    }),
  lastName: Joi.string()
    .required()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .messages({
      'string.pattern.base': 'All characters must be letters.'
    }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      'string.pattern.base':
        'Must contain has to contain letters and numbers and 8 characters long.'
    }),
  phone: Joi.string()
    .required()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(15)
    .messages({
      'string.pattern.base': 'All characters must be digits.'
    })
});
