import * as Koa from 'koa'
import middleware from './middleware/Compose'
import { config } from 'dotenv'

config()
import { initWithConsole } from './Logger'

initWithConsole()

import './messageQueue'
import './Redis'
import { createConnection } from 'typeorm';

const app = new Koa()
app.use(middleware)

const port = process.env.PORT || 3000;

createConnection().then(r => {
    console.log('DATABASE Connection is ready!')
}).catch(e => {
    console.log('DATABASE Connection refused!')
    console.error(e)
})

app.listen(port, async () => {
    console.log('server is running at http://localhost:' + port)
})
