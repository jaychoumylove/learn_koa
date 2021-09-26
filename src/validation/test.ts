import Base from './base'
import Joi from 'joi'
import mobileRule from '../rule/mobile'
import IdsRule from '../rule/Ids'
import Regexp from '../rule/Regexp'
import DateRule from '../rule/date'
import UrlRule from '../rule/url'

export default class Test extends Base {
    defaultSchema = Joi.object({
        id: Joi.number().integer().required().messages({
            'number.base': 'Invalid Id!',
            'number.integer': 'Invalid Id!',
            'any.required': 'Please enter Id!',
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
            'any.required': 'Please enter email!',
        }),
        repeat_password: Joi.any().valid(Joi.ref('password')).required().messages({
            'any.required': 'Please enter repeat_password',
            'any.only': 'Must be same as password',
        }),
        mobile: Joi.alternatives(
            Joi.string(),
            Joi.number(),
        ).custom(mobileRule).required().messages({
            'alternatives.types': 'Invalid Mobile!',
            'any.required': 'Please enter mobile!',
            'any.custom': 'Invalid Mobile!',
        }),
        sex: Joi.number().required().valid(0, 1).messages({
            'number.base': 'Sex should be integer!',
            'any.required': 'Please select sex!',
            'any.only': 'Should be 0 or 1',
        }),
        ids: Joi.string().required().custom(IdsRule).messages({
            'string.base': 'Invalid Ids!',
            'any.required': 'Please enter ids!',
            'any.custom': 'Invalid Ids!',
        }),
        startDate: Joi.string().required().custom(
            Regexp(/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/)).messages({
            'string.base': 'Invalid Start date!',
            'any.required': 'Please enter Start date!',
            'any.custom': 'Invalid Start Date!',
        }),
        endDate: Joi.string().required().custom(DateRule).messages({
            'string.base': 'Invalid End date!',
            'any.required': 'Please enter End date!',
            'any.custom': 'Invalid End Date!',
        }),
        domain: Joi.string().domain().required().messages({
            'string.base': 'Invalid domain!',
            'any.required': 'Please enter domain!',
            'string.domain': 'domain err',
        }),
        url: Joi.string().required().custom(UrlRule).messages({
            'string.base': 'Invalid url!',
            'any.required': 'Please enter url!',
            'any.custom': 'Invalid Url!',
        }),
        last_name: Joi.string().messages({
            'string.base': 'invalid last name',
        }),
        first_name: Joi.string().messages({
            'string.base': 'invalid first name',
        }),
    })
}