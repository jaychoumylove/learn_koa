import Base from './Base'
import { StatusCodes } from 'http-status-codes'

export default class Success extends Base {
    message = 'OK'

    data = null

    errorCode = 0

    constructor(data: {} = null, status: StatusCodes = StatusCodes.OK) {
        super()
        this.excepted({ data }, status)
    }
}
