import Joi from 'joi';

export const adminSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .messages({
      'string.empty': 'Name is required.',
      'any.required': 'Name is required.',
      'string.pattern.base': 'All characters must be letters.',
      'string.min': 'Name minimum length is 3.'
    }),
  lastName: Joi.string()
    .required()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .messages({
      'string.empty': 'Last Name is required.',
      'any.required': 'Last Name is required.',
      'string.pattern.base': 'All characters must be letters.',
      'string.min': 'Last Name minimum length is 3.'
    }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.',
      'string.pattern.base': 'Insert a valid email.'
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.',
      'string.pattern.base': 'Must contain letters, numbers and at least 8 characters long.'
    })
});
