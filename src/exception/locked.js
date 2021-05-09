import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class Locked extends Base {
  status = StatusCodes.LOCKED;
  errorCode = 10006;
  message = "Locked";
}
