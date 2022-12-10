import Joi from 'joi';

export const superAdminsValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/u)
    .required()
    .messages({
      'string.pattern.base': 'Must contain only letters',
      'string.min': 'Must have at least 3 characters',
      'any.required': 'This field is required'
    }),
  lastName: Joi.string()
    .min(3)
    .pattern(/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/u)
    .required()
    .messages({
      'string.pattern.base': 'Must contain only letters',
      'string.min': 'Must have at least 3 characters',
      'any.required': 'This field is required'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': 'This field is required'
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Must contain letter and numbers. Needs to have at least 8 charactertes',
      'any.required': 'This field is required'
    })
});
