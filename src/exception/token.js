import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Token extends Base {
    /**
     * Generate Token Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = StatusCodes.UNAUTHORIZED) {
        super({ ...DefaultRestCode.Token, ...data }, status)
    }
}
