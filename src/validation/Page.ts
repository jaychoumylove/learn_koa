import Base from './Base'
import * as Joi from 'joi'
import SortByRule from '../rule/SortBy'

export default class Page extends Base {
    defaultSchema = Joi.object({
        page: Joi.number().positive().messages({
            'number.base': 'Invalid page!',
            'number.positive': 'Invalid page!',
        }),
        size: Joi.number().positive().messages({
            'number.base': 'Invalid size!',
            'number.positive': 'Invalid size!',
        }),
        sortBy: Joi.string().custom(SortByRule).messages({
            'string.base': 'Invalid sortBy!',
            'any.custom': 'Invalid sortBy!',
        }),
        sortField: Joi.string().messages({
            'string.base': 'Invalid sortField!',
        }),
    })
}