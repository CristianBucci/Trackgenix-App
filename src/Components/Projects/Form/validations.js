import Joi from 'joi';

const employeeSchema = Joi.object({
  employeeId: Joi.string().length(24).required().messages({
    'string.required': 'You must select an employee.',
    'string.length': 'The id of this employee is not valid.',
    'string.empty': 'Employee is not allowed to be empty.'
  }),
  rate: Joi.number().required().messages({
    'number.required': 'Employee rate is required.',
    'number.empty': 'Employee rate is not allowed to be empty.'
  }),
  role: Joi.string().valid('DEV', 'PM', 'QA', 'TL').required().messages({
    'string.required': 'Employee role is required.',
    'string.valid': 'The employee role must be DEV, PM, QA or TL',
    'string.empty': 'Employee role is not allowed to be empty.'
  })
});

export const projectsSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.required': 'Project name is required.',
    'string.min': 'Project name must have at least 3 characters.',
    'string.empty': 'Project name is not allowed to be empty.'
  }),
  description: Joi.string().min(3).required().messages({
    'string.required': 'Project description is required.',
    'string.min': 'Project description must have at least 3 characters.',
    'string.empty': 'Project description is not allowed to be empty.'
  }),
  startDate: Joi.date().required().messages({
    'date.required': 'You must choose a start date.',
    'date.empty': 'Start date is not allowed to be empty.'
  }),
  endDate: Joi.date().greater('now').required().messages({
    'date.required': 'You must choose a end date.',
    'date.greater': 'End date must be greater than current date.',
    'date.empty': 'End date is not allowed to be empty.'
  }),
  clientName: Joi.string()
    .pattern(/^[\p{L}]+$/u)
    .min(3)
    .required()
    .messages({
      'string.required': 'Client name is required.',
      'string.min': 'Client name must have at least 3 characters.',
      'string.pattern.base': 'Client name only can contain letters.',
      'string.empty': 'End date is not allowed to be empty.'
    }),
  employees: Joi.array().items(employeeSchema)
});
