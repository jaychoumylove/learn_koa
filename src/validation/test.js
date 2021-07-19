import Base from './base'
import Joi from 'joi'

export default class Test extends Base {
    defaultSchema = Joi.object({
        id: Joi.number().integer().required().messages({
            'number.base': 'Invalid Id!',
            'number.integer': 'Invalid Id!',
            'number.required': 'Invalid Id!',
        }),
        password: Joi.string().min(6).max(16).alphanum().messages({
            'string.base': 'password must be 6-16 length!',
            'string.min': 'password must be 6-16 length!',
            'string.max': 'password must be 6-16 length!',
            'string.alphanum': 'password must be 6-16 length!',
        }),
        email: Joi.string().email().required().messages({
            'string.base': 'Invalid email!',
            'string.email': 'Invalid email!',
            'string.required': 'Please enter email!',
        }),
        repeat_password: Joi.any().valid(Joi.ref('password')).required().messages({
            'any.required': 'Please enter repeat_password',
            'any.only': "Must be same as password",
        })
    })
}