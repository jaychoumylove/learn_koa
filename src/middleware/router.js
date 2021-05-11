import Router from "@koa/router";
import Success from "../exception/success";
import { delay } from "../util";

const router = new Router();

router.get("/test", async (ctx, next) => {
  // await delay(3000);
  // throw new Error("something was wrong");
  throw new Success({ count: 1, data: [1] });
});

router.put("/test", async (ctx, next) => {
  // await delay(3000);
  // throw new Error("something was wrong");
  throw new Success({ count: 1, data: [2] });
});

export default router;
