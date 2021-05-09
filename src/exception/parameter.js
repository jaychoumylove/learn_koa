import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class Parameter extends Base {
  status = StatusCodes.BAD_REQUEST;
  message = "Invalid parameters!";
  errorCode = 1000;
}
