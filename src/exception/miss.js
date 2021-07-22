import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Miss extends Base {
    /**
     * Generate Miss Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = DefaultRestCode.Miss, status = StatusCodes.NOT_FOUND) {
        super({ ...DefaultRestCode.Miss, ...data }, status)
    }
}
