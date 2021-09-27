import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class Forbidden extends Base {
    message = 'Permission denied!'

    errorCode = 20001

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.FORBIDDEN) {
        super()
        this.excepted(data, status)
    }
}
