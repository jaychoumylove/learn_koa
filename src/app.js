import Koa from 'koa'
import middleware from './middleware/compose'
import dotEnv from 'dotenv'

dotEnv.config()
import {
    initLogger,
    writeInfoLog
} from './middleware/logger'

initLogger()

import './messageQueue/index'

const app = new Koa()
app.use(middleware)

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    writeInfoLog('server is running at http://localhost:' + port)
})
