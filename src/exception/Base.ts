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
    constructor(data = null, status = 0) {
        super()
        // Fixed compile to es5 extends Class bug. see https://github.com/microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
        Object.setPrototypeOf(this, new.target.prototype);
        if (data || status) {
            const tempData = (!data || JSON.stringify(data) === '{}') ? {} : data;
            const tempStatus = status ? status : null;
            this.excepted(tempData, tempStatus);
        }
    }

    public excepted = (data = {}, status = StatusCodes.OK) => {
        if (data instanceof Object && data) {
            for (const allowProp of allowProps) {
                if (data.hasOwnProperty(allowProp)) {
                    this[allowProp] = data[allowProp]
                }
            }
        }

        if (status) {
            this.status = status
        }
    }
}
