import Base from "../exception/base";
import { Context } from "koa";
import { StatusCodes } from "http-status-codes";
import Miss from "../exception/miss";
import Success from "../exception/success";
import config from "../config";
import { getClients } from "../messageQueue/index";

/**
 * register error handle
 * @param {Context} ctx
 * @param {Promise} next
 * @returns
 */
const errorHandle = async (ctx, next) => {
  const start = Date.now();
  try {
    console.log(`${ctx.method} ${ctx.path}: Start.`);
    await next();
    if (404 === ctx.response.status) {
      throw new Miss({ message: "Router not found!" });
    }
    if ("OPTIONS" === ctx.method) {
      throw new Success();
    }
  } catch (error) {
    if (error instanceof Base) {
      const { status, message, data, errorCode } = error;
      ctx.response.body = {
        message,
        data,
        errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.response.status = status;
      const spendTime = Math.round(Date.now() - start);
      console.log(`${ctx.method} ${ctx.path}: OK; spend: ${spendTime}ms`);
      return;
    }
    const spendTime = Math.round(Date.now() - start);
    console.error(`${ctx.method} ${ctx.path}:spend: ${spendTime}ms. `);
    console.error(error);

    if (config.devVar.indexOf(process.env.APP_ENV) > -1) {
      throw error;
    }
    getClients().EmailClient.publish("exceptions", "exception", error.message);
    ctx.response.body = {
      message: "Server unknown error",
      errorCode: 9999,
      data: null,
      requestUrl: `${ctx.method} ${ctx.path}`,
    };
    ctx.response.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

export default errorHandle;
