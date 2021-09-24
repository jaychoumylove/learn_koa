import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Forbidden extends Base {
    message = 'Permission denied!'

    errorCode = 20001

    data = null

    /**
     * Generate Forbidden Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor(data = {}, status = StatusCodes.FORBIDDEN) {
        super()
        this.excepted(data, status)
    }
}
