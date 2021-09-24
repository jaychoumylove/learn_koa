import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class MethodNotAllowed extends Base {
    message = 'Method not allowed!'

    errorCode = 10001

    data = null

    /**
     * Generate MethodNotAllowed Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor(data = {}, status = StatusCodes.METHOD_NOT_ALLOWED) {
        super()
        this.excepted(data, status)
    }
}
