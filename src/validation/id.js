import Base from './base'
import Joi from 'joi';

export default class Id extends Base {
    defaultSchema = Joi.object({
        id: Joi.number().integer()
    })
}