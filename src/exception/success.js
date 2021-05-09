import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class Success extends Base {
  status = StatusCodes.OK;
  errorCode = 0;
  message = "OK";
  expose = true;
  constructor(data) {
    super({ data });
  }
}
