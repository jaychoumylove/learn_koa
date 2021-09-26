import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Token extends Base {
    message = 'Invalid token!'

    errorCode = 10001

    data = null

    /**
     * Generate Token Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor(data = {}, status = StatusCodes.UNAUTHORIZED) {
        super()
        this.excepted(data, status)
    }
}
