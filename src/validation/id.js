import Base from './base'
import Joi from 'joi';

export default class Id extends Base {
    defaultSchema = Joi.object({
        id: Joi.number().integer().required().messages({
            'number.base': 'Invalid id!',
            'any.required': 'Please enter id!',
            'number.integer': 'Id must be integer!'
        })
    })
}