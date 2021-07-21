import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class NotImplemented extends Base {
  /**
   * Generate NotImplemented Error
   * @param {{message?: String, errorCode?: Number, data?: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.NotImplemented, status = StatusCodes.NOT_IMPLEMENTED) {
    super(data, status)
  }
}
