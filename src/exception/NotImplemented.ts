import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class NotImplemented extends Base {
    message = 'Not Implemented!'

    errorCode = 10001

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.NOT_IMPLEMENTED) {
        super()
        this.excepted(data, status)
    }
}
