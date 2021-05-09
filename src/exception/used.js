import Base from "./base";

export default class Used extends Base {
  status = 226; // statuscode did't have 226
  errorCode = 10004;
  message = "Occupied";
}
