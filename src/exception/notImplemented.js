import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class NotImplemented extends Base {
    /**
     * Generate NotImplemented Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = StatusCodes.NOT_IMPLEMENTED) {
        super({ ...DefaultRestCode.NotImplemented, ...data }, status)
    }
}
