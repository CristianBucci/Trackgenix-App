import Joi from 'joi';

export const superAdminsValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[\p{L}]+$/u)
    .required()
    .messages({
      'string.pattern.base': 'Must contain only letters'
    }),
  lastName: Joi.string()
    .min(3)
    .pattern(/^[\p{L}]+$/u)
    .required()
    .messages({
      'string.pattern.base': 'Must contain only letters'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Must contain letter and numbers. Needs to be atl least 8 charactertes'
    })
});
