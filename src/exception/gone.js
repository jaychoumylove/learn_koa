import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Gone extends Base {
    /**
     * Generate Gone Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = StatusCodes.GONE) {
        super({ ...DefaultRestCode.Gone, ...data }, status)
    }
}
