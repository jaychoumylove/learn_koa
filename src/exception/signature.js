import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Signature extends Base {
    message = 'Invalid signature!'
    errorCode = 10007
    data = null

    /**
     * Generate Signature Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor (data = {}, status = StatusCodes.UNAUTHORIZED) {
        super()
        this.excepted(data, status)
    }
}
