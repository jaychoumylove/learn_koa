import Base from './base'
import Joi from 'joi';

export default class Test extends Base {
    defaultSchema = Joi.object({
        id: Joi.number().integer().required(),
        password: Joi.string().min(6).max(16).alphanum(),
        email: Joi.string().email().required(),
        repeat_password: Joi.ref('password')
    }).rule().messages({
        id: 'id',
        password: 'Joi.string().min(6).max(16).alphanum()',
        email: 'Joi.string().email().required()',
        repeat_password: "Joi.ref('password')"
    })
}