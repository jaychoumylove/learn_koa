import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Token extends Base {
  /**
   * Generate Token Error
   * @param {{message?: String, errorCode?: Number, data?: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Token, status = StatusCodes.UNAUTHORIZED) {
    super(data, status)
  }
}
