import { StatusCodes } from "http-status-codes";
export Base from "./base";

export default class Signature extends Base {
  status = StatusCodes.UNAUTHORIZED;
  errorCode = 10007;
  message = "Invalid signature!";
}
