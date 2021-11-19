import compose from 'koa-compose'
import errorHandle from './errorHandle'
import router from './router'
import corsHandle from './cors'
import responseTime from 'koa-response-time'
import NotImplemented from '../exception/notImplemented'
import MethodNotAllowed from '../exception/methodNotAllowed'
import koaBody from 'koa-body'
import staticHandle from './static'

const all = [
    responseTime({ hrtime: true }),
    corsHandle,
    staticHandle,
    errorHandle,
    koaBody({
        multipart: true,
    }),
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
