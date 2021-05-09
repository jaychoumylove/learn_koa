import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class Miss extends Base {
  status = StatusCodes.NOT_FOUND;
  errorCode = 10002;
  message = "Miss";
}
