import Joi from 'joi';

export const passwords = Joi.object({
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.',
      'string.pattern.base': 'Must contain letters, numbers and at least 8 characters long.'
    }),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password must match',
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.'
  })
});
