import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Locked extends Base {
    message = 'Locked!'
    errorCode = 10006
    data = null

    /**
     * Generate Locked Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor (data = {}, status = StatusCodes.LOCKED) {
        super()
        this.excepted(data, status)
    }
}
