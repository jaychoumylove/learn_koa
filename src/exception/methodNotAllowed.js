import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class MethodNotAllowed extends Base {
  status = StatusCodes.METHOD_NOT_ALLOWED;
  errorCode = 10001;
  message = "METHOD_NOT_ALLOWED";
}
