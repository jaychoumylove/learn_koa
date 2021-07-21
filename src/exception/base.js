import { StatusCodes } from "http-status-codes";

const allowProps = ["data", "errorCode", "message"];

export default class Base extends Error {
  status = StatusCodes.OK;
  errorCode = 0;
  message = "success";
  data = null;

  /**
   * Generate Base Error
   * @param {{message?: String, errorCode?: Number, data?: Object}|null} data
   * @param {Number} status
   */
  constructor(data = null, status = 200) {
    super();
    if (data instanceof Object && data) {
      allowProps.map((item) => {
        if (data.hasOwnProperty(item)) {
          this[item] = data[item];
        }
      });
    }

    this.status = status;
  }
}
