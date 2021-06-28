import { StatusCodes } from "http-status-codes";
import { fillExceptionProperty } from "../util";
import Base from "./base";

export default class Parameter extends Base {
  status = StatusCodes.BAD_REQUEST;
  message = "Invalid parameters!";
  errorCode = 10001;
}
