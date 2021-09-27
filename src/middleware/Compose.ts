import * as compose from 'koa-compose'
import errorHandle from './errorHandle'
import router from './router'
import corsHandle from './cors'
import * as responseTime from 'koa-response-time'
import NotImplemented from '../exception/notImplemented'
import MethodNotAllowed from '../exception/methodNotAllowed'
import * as bodyParser from 'koa-bodyparser'
import staticHandle from './static'

const all = [
    responseTime({ hrtime: true }),
    staticHandle,
    errorHandle,
    corsHandle,
    bodyParser(),
    router.routes(),
    router.allowedMethods({
        throw: true,
        notImplemented: () => {
            throw new NotImplemented()
        },
        methodNotAllowed: () => {
            throw new MethodNotAllowed()
        },
    }),
]

export default compose(all)
