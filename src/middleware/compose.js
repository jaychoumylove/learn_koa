import compose from "koa-compose";
import errorHandle from "./errorHandle";
import router from "../router";
import corsHandle from "./cors";
import NotImplemented from "../exception/notImplemented";
import MethodNotAllowed from "../exception/methodNotAllowed";
import bodyParser from "koa-bodyparser";

const all = [
  errorHandle,
  corsHandle,
  bodyParser(),
  router.routes(),
  router.allowedMethods({
    throw: true,
    notImplemented: () => {
      throw new NotImplemented();
    },
    methodNotAllowed: () => {
      throw new MethodNotAllowed();
    },
  }),
];

export default compose(all);
