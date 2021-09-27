import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class Gone extends Base {
    data = null

    message = 'Gone!'

    errorCode = 10005

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.GONE) {
        super()
        this.excepted(data, status)
    }
}
