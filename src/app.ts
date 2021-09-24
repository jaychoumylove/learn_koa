import * as Koa from 'koa'
import middleware from './middleware/compose'
import { config } from 'dotenv'

config()
import {
    initLogger, writeErrorLog,
    writeInfoLog,
} from './logger'

initLogger()

import './messageQueue/index'
import { createConnection } from 'typeorm';

const app = new Koa()
app.use(middleware)

const port = process.env.PORT || 3000;

createConnection().then(r => {
    writeInfoLog('Connection is ready!')
    writeInfoLog(r)
}).catch(e => {
    writeErrorLog(e)
})

app.listen(port, async () => {
    writeInfoLog('server is running at http://localhost:' + port)
})
