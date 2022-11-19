import Joi from 'joi';

const employeeSchema = Joi.object({
  employeeId: Joi.string().length(24).required(),
  role: Joi.string().valid('DEV', 'PM', 'QA', 'TL').required(),
  rate: Joi.number().required()
});

export const projectsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater('now').required(),
  clientName: Joi.string()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .required()
    .messages({ 'string.pattern.base': 'Client name only can contain letters,' }),
  employees: Joi.array().items(employeeSchema)
});
