import Joi from 'joi';

export const projectsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater('now').required(),
  clientName: Joi.string()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .required()
    .messages({ 'string.pattern.base': 'Client name only can contain letters,' })
});
