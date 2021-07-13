import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Miss extends Base {
  /**
   * Generate Miss Error
   * @param {{message: String, errorCode: Number, data: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Miss, status = StatusCodes.NOT_FOUND) {
    super(data, status)
  }
}
