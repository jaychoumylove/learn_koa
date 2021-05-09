import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class Token extends Base {
  status = StatusCodes.UNAUTHORIZED;
  errorCode = 10001;
  message = "Invalid token!";
}
