import { StatusCodes } from "http-status-codes";

const allowProps = ["data", "errorCode", "message"];

export default class Base extends Error {
  status = StatusCodes.OK;
  errorCode = 0;
  message = "success";
  data = null;

  constructor(data = null, status = 0) {
    super();
    if (data instanceof Object) {
      allowProps.map((item) => {
        if (data.hasOwnProperty(item)) {
          this[item] = data[item];
        }
      });
    }

    this.status = status;
  }
}
