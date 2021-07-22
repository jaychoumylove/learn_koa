import Base from './base'
import Joi from 'joi';
import IdsRule from '../rule/Ids'

export default class Ids extends Base {
    defaultSchema = Joi.object({
        ids: Joi.string().required().custom(IdsRule()).messages({
            'string.base': 'Invalid ids!',
            'any.required': 'Please enter ids!',
            'any.custom': 'Invalid Ids!'
        }),
    })
}