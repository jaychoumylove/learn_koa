import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Parameter extends Base {
    message = 'Invalid parameters!'
    errorCode = 10001
    data = null

    /**
     * Generate Parameter Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor (data = {}, status = StatusCodes.BAD_REQUEST) {
        super()
        this.excepted(data, status)
    }
}
