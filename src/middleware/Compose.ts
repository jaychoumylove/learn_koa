import * as compose from 'koa-compose'
import errorHandle from './ErrorHandle'
import router from './Router'
import corsHandle from './Cors'
import * as responseTime from 'koa-response-time'
import NotImplemented from '../exception/NotImplemented'
import MethodNotAllowed from '../exception/MethodNotAllowed'
import * as koaBody from 'koa-body'
import staticHandle from './Static'

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
