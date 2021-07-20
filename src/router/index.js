import Router from "@koa/router";
import userRouter from './userRouter'

const router = new Router();

userRouter(router);

export default router;
