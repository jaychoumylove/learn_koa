import Base from "../exception/base";

const errorHandle = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof Base) {
      const { status, ...resData } = error;
      ctx.response.body = {
        ...resData,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.response.status = status;
      return;
    }
    if (process.env.APP_ENV === "dev") {
      throw error;
    }
    ctx.response.body = {
      message: "Server unknown error",
      errorCode: 999,
      data: null,
      requestUrl: `${ctx.method} ${ctx.path}`,
    };
    ctx.response.status = 500;
    return;
  }
};

export default errorHandle;
