import Base from './base'
import DefaultRestCode from './defaultRestCode'

export default class Used extends Base {
    /**
     * Generate Used Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = {}, status = 226) {
        super({ ...DefaultRestCode.Used, ...data }, status)
    }
}
