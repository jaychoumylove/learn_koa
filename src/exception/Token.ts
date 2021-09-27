import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class Token extends Base {
    message = 'Invalid token!'

    errorCode = 10001

    data = null


    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.UNAUTHORIZED) {
        super()
        this.excepted(data, status)
    }
}
