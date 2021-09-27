import * as cors from '@koa/cors'
import config from '../Config'

const allowOrigin = 'http://localhost:3000'
const corsHandle = cors({
    origin: (ctx) => {
        if (config.devVar.indexOf(process.env.APP_ENV) > -1) {
            return ctx.request.headers.origin
        }
        return allowOrigin
    },
    credentials: true,
    allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: [
        'Content-Type',
        'Authorization',
        'Signature',
        'once',
        'time',
        'platform',
        'parameter',
        'token',
        'Origin',
        'X-Requested-With',
        'Accept',
        'current-version',
        'cache-control',
        'postman-token',
    ],
    exposeHeaders: ['Link'],
    maxAge: 3600,
})

export default corsHandle
