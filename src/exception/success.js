import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Success extends Base {
  /**
   * Generate Success Response
   * @param {{message: String, errorCode: Number, data: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Success, status = StatusCodes.OK) {
    super(data, status)
  }
}
