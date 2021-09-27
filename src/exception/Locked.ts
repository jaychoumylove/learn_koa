import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class Locked extends Base {
    message = 'Locked!'

    errorCode = 10006

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.LOCKED) {
        super()
        this.excepted(data, status)
    }
}
