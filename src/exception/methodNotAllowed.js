import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class MethodNotAllowed extends Base {
    /**
     * Generate MethodNotAllowed Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = StatusCodes.METHOD_NOT_ALLOWED) {
        super({ ...DefaultRestCode.Locked, ...data }, status)
    }
}
