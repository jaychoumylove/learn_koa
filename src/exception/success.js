import Base from './base'
import { StatusCodes } from 'http-status-codes'

export default class Success extends Base {
    message = 'OK'
    data = null
    errorCode = 0

    /**
     * Generate Success Response
     * @param {?Object} data
     * @param {?Number} status
     */
    constructor (data = null, status = StatusCodes.OK) {
        super()
        this.excepted({ data }, status)
    }
}
