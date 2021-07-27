import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Gone extends Base {
    data = null
    message = 'Gone!'
    errorCode = 10005

    /**
     * Generate Gone Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor (data = {}, status = StatusCodes.GONE) {
        super()
        this.excepted(data, status)
    }
}
