import { StatusCodes } from 'http-status-codes'

const allowProps = ['data', 'errorCode', 'message']

export default class Base extends Error {
    status = StatusCodes.OK
    message = 'OK'
    data = null
    errorCode = 0

    /**
     * Generate Base Error
     * @param {?{message?: String, errorCode?: Number, data?: Object}} data
     * @param {?Number} status
     */
    constructor (data = null, status = 0) {
        super()
        if (data || status) {
            const tempData = !data || JSON.stringify(data) === '{}' ? null: data;
            const tempStatus = status ? status: null;
            this.excepted(tempData, tempStatus);
        }
    }

    excepted (data = {}, status = StatusCodes.OK) {
        if (data instanceof Object && data) {
            allowProps.map((item) => {
                if (data.hasOwnProperty(item)) {
                    this[item] = data[item]
                }
            })
        }

        if (status) {
            this.status = status
        }
    }
}
