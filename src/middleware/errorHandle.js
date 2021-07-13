import Base from "../exception/base";
import { writeErrorLog, writeInfoLog } from "./logger";
import { Context } from "koa";
import { StatusCodes } from "http-status-codes";
import Miss from "../exception/miss";
import defaultRestCode from '../exception/defaultRestCode'

/**
 * register error handle
 * @param {Context} ctx
 * @param {Promise} next
 * @returns
 */
const errorHandle = async (ctx, next) => {
  const start = Date.now();
  try {
    writeInfoLog(`${ctx.method} ${ctx.path}: Start.`);
    await next();
    if (404 === ctx.response.status) {
      throw new Miss({ message: "Router not found!" });
    }
  } catch (error) {
    if (error instanceof Base) {
      const { status, ...resData } = error;
      ctx.response.body = {
        ...resData,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.response.status = status;
      const spendTime = Math.round(Date.now() - start);
      writeInfoLog(`${ctx.method} ${ctx.path}: OK; spend: ${spendTime}ms`);
      return;
    }
    const spendTime = Math.round(Date.now() - start);
    writeErrorLog(
      `${ctx.method} ${ctx.path}:spend: ${spendTime}ms. `
    );
    writeErrorLog(error);
    if (process.env.APP_ENV === "dev") {
      throw error;
    }
    ctx.response.body = {
      ...defaultRestCode.InternalServer,
      requestUrl: `${ctx.method} ${ctx.path}`,
    };
    ctx.response.status = StatusCodes.INTERNAL_SERVER_ERROR;
    return;
  }
};

export default errorHandle;
