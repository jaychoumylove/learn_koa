import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class Parameter extends Base {
    message = 'Invalid parameters!'

    errorCode = 10001

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.BAD_REQUEST) {
        super()
        this.excepted(data, status)
    }
}
