import Base from './Base'

export default class Used extends Base {
    message = 'Occupied!'

    errorCode = 10004

    data = null

    /**
     * Generate Used Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor(data = {}, status = 226) {
        super()
        this.excepted(data, status)
    }
}
