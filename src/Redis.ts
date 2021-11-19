import { createClient } from 'redis';
import { config } from 'dotenv'

config()

let RedisClient = null

if (parseInt(process.env.REDIS_STATUS)) {
    RedisClient = createClient({
        db: process.env.REDIS_DB,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    });
    RedisClient.on('error', err => {
        console.error('[REDIS]')
        console.error(err)
    })
}

export default RedisClient