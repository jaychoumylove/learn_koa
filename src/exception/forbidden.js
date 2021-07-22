import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Forbidden extends Base {
    /**
     * Generate Forbidden Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = StatusCodes.FORBIDDEN) {
        super({ ...DefaultRestCode.Forbidden, ...data }, status)
    }
}
