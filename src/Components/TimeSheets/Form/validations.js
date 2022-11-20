import Joi from 'joi';

export const timesheetsValidationSchema = Joi.object({
  description: Joi.string().required().messages({
    'string.pattern.base': 'All characters must be letters.',
    'string.required': 'Description is a required field'
  }),
  date: Joi.date().required().max('now').messages({
    'string.pattern.base': 'Must contain only numbers and symbols.',
    'string.max': 'The year must be current year as max',
    'string.required': 'Date is a required field'
  }),
  hours: Joi.number().integer().min(0).max(12).required().messages({
    'string.pattern.base': 'Should be a number.',
    'string.min': 'There should be at least one number',
    'string.max': 'Maximum of hours is 12',
    'string.required': 'Hours is a required field'
  }),
  task: Joi.string().alphanum().length(24).required().messages({
    'string.pattern.base': 'You should choose one task.',
    'string.length': 'The id of this task is not valid.',
    'string.required': 'Task must be selected'
  }),
  employee: Joi.string().alphanum().length(24).required().messages({
    'string.pattern.base': 'You should choose one employee.',
    'string.length': 'The id of this employee is not valid.',
    'string.required': 'Employee must be selected'
  }),
  project: Joi.string().required().alphanum().max(24).messages({
    'string.pattern.base': 'You should choose one project.',
    'string.length': 'The id of this project is not valid.',
    'string.required': 'Project must be selected'
  })
});
