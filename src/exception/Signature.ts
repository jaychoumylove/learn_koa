import { StatusCodes } from 'http-status-codes'
import Base, { ErrorProps } from './Base'

export default class Signature extends Base {
    message = 'Invalid signature!'

    errorCode = 10007

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = StatusCodes.UNAUTHORIZED) {
        super()
        this.excepted(data, status)
    }
}
