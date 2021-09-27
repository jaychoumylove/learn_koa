import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class Miss extends Base {
    message = 'Miss!'

    errorCode = 10002

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.NOT_FOUND) {
        super()
        this.excepted(data, status)
    }
}
