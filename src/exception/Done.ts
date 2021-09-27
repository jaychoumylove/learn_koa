import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class Done extends Base {
    message = 'Already done!'

    errorCode = 0

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.CREATED) {
        super()
        this.excepted(data, status)
    }
}
