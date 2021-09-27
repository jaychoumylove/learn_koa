import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class NotImplemented extends Base {
    message = 'Not Implemented!'

    errorCode = 10001

    data = null

    /**
     * Generate NotImplemented Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor(data = {}, status = StatusCodes.NOT_IMPLEMENTED) {
        super()
        this.excepted(data, status)
    }
}
