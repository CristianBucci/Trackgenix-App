import Joi from 'joi';

export const timesheetsValidationSchema = Joi.object({
  description: Joi.string().required().messages({
    'string.pattern.base': 'All characters must be letters.'
  }),
  date: Joi.date().required().max('now').messages({
    'string.pattern.base': 'Must contain only numbers and symbols.'
  }),
  hours: Joi.number().integer().min(0).max(12).required().messages({
    'string.pattern.base': 'Must contain at least 1 number.'
  }),
  task: Joi.string().alphanum().length(24).required().messages({
    'string.pattern.base': 'All characters must be alphanumeric.'
  }),
  employee: Joi.string().alphanum().length(24).required().messages({
    'string.pattern.base': 'All characters must be alphanumeric.'
  }),
  project: Joi.string().required().alphanum().max(24).messages({
    'string.pattern.base': 'All characters must be alphanumeric.'
  })
});
