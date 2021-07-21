import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Done extends Base {
  /**
   * Generate Done Error
   * @param {{message?: String, errorCode?: Number, data?: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Done, status = StatusCodes.CREATED) {
    super(data, status)
  }
}
