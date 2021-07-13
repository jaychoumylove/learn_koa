import Base from "./base";
import defaultResponse from './defaultRestCode'

export default class Used extends Base {
  /**
   * Generate Used Error
   * @param {{message: String, errorCode: Number, data: Object}} data
   * @param {Number} status
   */
  constructor (data = defaultResponse.Used, status = 226) {
    super(data, status)
  }
}
