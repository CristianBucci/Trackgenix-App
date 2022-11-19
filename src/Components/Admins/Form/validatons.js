import Joi from 'joi';

export const Schema = Joi.object({
  name: Joi.string()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .required(),
  lastName: Joi.string()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
});
