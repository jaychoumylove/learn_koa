import send from 'koa-send'
import path from 'path'

const staticPath = path.join(__dirname, '../../public/')
const staticHandle = (ctx) => {
    return send(ctx, ctx.path, { root: staticPath });
}

export default staticHandle
