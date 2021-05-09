import compose from "koa-compose";
import errorHandle from "./errorHandle";
import router from "./router";

const all = [
  errorHandle,
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
