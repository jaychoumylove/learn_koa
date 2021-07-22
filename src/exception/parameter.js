import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Parameter extends Base {
    /**
     * Generate Parameter Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = StatusCodes.BAD_REQUEST) {
        super({ ...DefaultRestCode.Parameter, ...data }, status)
    }
}
