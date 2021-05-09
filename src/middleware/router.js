import Router from "@koa/router";
import Success from "../exception/success";

const router = new Router();

router.get("/test", async (ctx, next) => {
  // await delay(3000);
  throw new Error("something was wrong");
  // throw new Success({ count: 1, data: [1] });
  // throw new Miss();
});

router.put("/test", async (ctx, next) => {
  // await delay(3000);
  // throw new Error("something was wrong");
  // throw new Success({ count: 1, data: [1] });
  throw new Miss();
});

export default router;
