import { StatusCodes } from 'http-status-codes'
import Base from './base'
import defaultResponse from './defaultRestCode'

export default class Parameter extends Base {
    /**
     * Generate Parameter Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = defaultResponse.Parameter, status = StatusCodes.BAD_REQUEST) {
        super(data, status)
    }
}
