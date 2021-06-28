import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class NotImplemented extends Base {
  status = StatusCodes.NOT_IMPLEMENTED;
  errorCode = 10001;
  message = "METHOD_NOT_ALLOWED";
}
