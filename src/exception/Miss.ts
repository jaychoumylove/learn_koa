import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Miss extends Base {
    message = 'Miss!'

    errorCode = 10002

    data = null

    /**
     * Generate Miss Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor(data = {}, status = StatusCodes.NOT_FOUND) {
        super()
        this.excepted(data, status)
    }
}
