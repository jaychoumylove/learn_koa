import { StatusCodes } from 'http-status-codes'
import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Done extends Base {
    /**
     * Generate Done Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = StatusCodes.CREATED) {
        super({ ...DefaultRestCode.Done, ...data }, status)
    }
}
