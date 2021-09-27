import Base, { ErrorProps } from './Base'
import { StatusCodes } from "http-status-codes";

export default class Used extends Base {
    message = 'Occupied!'

    errorCode = 10004

    data = null

    constructor(data: ErrorProps = null, status: StatusCodes = 226) {
        super()
        this.excepted(data, status)
    }
}
