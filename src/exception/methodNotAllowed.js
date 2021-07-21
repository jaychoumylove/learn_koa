import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class MethodNotAllowed extends Base {
  /**
   * Generate MethodNotAllowed Error
   * @param {{message?: String, errorCode?: Number, data?: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.MethodNotAllowed, status = StatusCodes.METHOD_NOT_ALLOWED) {
    super(data, status)
  }
}
