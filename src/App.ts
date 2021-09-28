import * as Koa from 'koa'
import middleware from './middleware/Compose'
import { config } from 'dotenv'

config()
import { initWithConsole } from './Logger'

initWithConsole()

import './messageQueue/Index'
import './Redis'
import { createConnection } from 'typeorm';

const app = new Koa()
app.use(middleware)

const port = process.env.PORT || 3000;

createConnection().then(r => {
    console.log('Connection is ready!')
    console.log(r)
}).catch(e => {
    console.error(e)
})

app.listen(port, async () => {
    console.log('server is running at http://localhost:' + port)
})
