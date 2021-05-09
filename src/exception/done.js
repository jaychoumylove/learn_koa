import { StatusCodes } from "http-status-codes";
import Base from "./base";

export default class Done extends Base {
  status = StatusCodes.CREATED;
  message = "Already done";
}
