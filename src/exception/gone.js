import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Gone extends Base {
  /**
   * Generate Gone Error
   * @param {{message?: String, errorCode?: Number, data?: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Gone, status = StatusCodes.GONE) {
    super(data, status)
  }
}
