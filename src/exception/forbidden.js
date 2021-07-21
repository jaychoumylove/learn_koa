import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Forbidden extends Base {
  /**
   * Generate Forbidden Error
   * @param {{message?: String, errorCode?: Number, data?: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Forbidden, status = StatusCodes.FORBIDDEN) {
    super(data, status)
  }
}
