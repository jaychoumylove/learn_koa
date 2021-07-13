import { StatusCodes } from "http-status-codes";
import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Signature extends Base {
  /**
   * Generate Signature Error
   * @param {{message: String, errorCode: Number, data: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Signature, status = StatusCodes.UNAUTHORIZED) {
    super(data, status)
  }
}
