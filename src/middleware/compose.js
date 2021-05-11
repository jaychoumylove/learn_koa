import compose from "koa-compose";
import errorHandle from "./errorHandle";
import router from "./router";
import corsHandle from "./cors";

const all = [
  errorHandle,
  corsHandle,
  router.routes(),
  router.allowedMethods({
    throw: true,
    notImplemented: () => {
      console.log(1);
    },
    methodNotAllowed: () => {
      console.log(2);
    },
  }),
];

export default compose(all);
