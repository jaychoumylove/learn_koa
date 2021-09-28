import Koa from 'koa'
import middleware from './middleware/compose'
import dotEnv from 'dotenv'

dotEnv.config()
import {
    initWithConsole,
    writeInfoLog
} from './logger'

initWithConsole()

import './messageQueue/index'

const app = new Koa()
app.use(middleware)

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log('server is running at http://localhost:' + port)
})
