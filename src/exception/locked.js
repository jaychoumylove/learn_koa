import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Locked extends Base {
    /**
     * Generate Locked Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = StatusCodes.LOCKED) {
        super({ ...DefaultRestCode.Locked, ...data }, status)
    }
}
