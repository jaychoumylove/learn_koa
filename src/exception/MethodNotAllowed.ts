import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class MethodNotAllowed extends Base {
    message = 'Method not allowed!'

    errorCode = 10001

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.METHOD_NOT_ALLOWED) {
        super()
        this.excepted(data, status)
    }
}
