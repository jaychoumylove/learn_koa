import { StatusCodes } from 'http-status-codes'
import defaultRestCode from './defaultRestCode'

const allowProps = ['data', 'errorCode', 'message']

export default class Base extends Error {
    /**
     * Generate Base Error
     * @param {{message?: String, errorCode?: Number, data?: Object}} data
     * @param {Number} status
     */
    constructor (data = defaultRestCode.Success, status = StatusCodes.OK) {
        super()
        if (data instanceof Object && data) {
            allowProps.map((item) => {
                if (data.hasOwnProperty(item)) {
                    this[item] = data[item]
                }
            })
        }

        this.status = status
    }
}
