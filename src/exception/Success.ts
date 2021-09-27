import Base from './Base'
import { StatusCodes } from 'http-status-codes'
// import { writeInfoLog } from '../logger';

export default class Success extends Base {
    message = 'OK'

    data = null

    errorCode = 0

    constructor(data = null, status = StatusCodes.OK) {
        super()
        this.excepted({ data }, status)
    }
}
