import { StatusCodes } from 'http-status-codes'
import Base from './base'

export default class Done extends Base {
    message = 'Already done!'

    errorCode = 0

    data = null

    /**
     * Generate Done Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor(data = {}, status = StatusCodes.CREATED) {
        super()
        this.excepted(data, status)
    }
}
