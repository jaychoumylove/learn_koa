import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Locked extends Base {
  /**
   * Generate Locked Error
   * @param {{message: String, errorCode: Number, data: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Locked, status = StatusCodes.LOCKED) {
    super(data, status)
  }
}
