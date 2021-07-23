import Koa from 'koa'
import middleware from './middleware/compose'
import dotEnv from 'dotenv'

dotEnv.config()
import {
    initLogger,
    writeInfoLog
} from './middleware/logger'

initLogger()

const app = new Koa()
app.use(middleware)

app.listen(3000, async () => {
    writeInfoLog('server is running at http://localhost:3000')
})
