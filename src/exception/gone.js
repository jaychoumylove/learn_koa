import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class Gone extends Base {
  status = StatusCodes.GONE;
  errorCode = 10005;
  message = "Gone";
}
