import cors from "@koa/cors";

const allowOrigin = "http://localhost:3000";

// allow_origin: ['*']
// allow_methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE']
// allow_headers: ['Content-Type', 'Authorization', 'Signature', 'once', 'time', 'platform', 'parameter','token','Origin', 'X-Requested-With', 'Accept','current-version']
// expose_headers: ['Link']
// max_age: 3600

const corsHandle = cors({
  origin: () => {
    const env = process.env.APP_ENV;
    if (env == "test" || env == "dev") {
      return "*";
    }
    return allowOrigin;
  },
  allowMethods: ["GET", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"],
  allowHeaders: [
    "Content-Type",
    "Authorization",
    "Signature",
    "once",
    "time",
    "platform",
    "parameter",
    "token",
    "Origin",
    "X-Requested-With",
    "Accept",
    "current-version",
  ],
  exposeHeaders: ["Link"],
  maxAge: 3600,
});

export default corsHandle;
