import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class Forbidden extends Base {
  status = StatusCodes.FORBIDDEN;
  message = "Permission denied!";
  errorCode = 20001;
}
