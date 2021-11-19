import * as send from 'koa-send'
import { join } from 'path'

const staticPath = join(__dirname, '../../')
const staticHandle = (ctx, next) => {
    if (ctx.path.indexOf('/public/') > -1) {
        return send(ctx, ctx.path, { root: staticPath });
    }
    return next()
}

export default staticHandle
