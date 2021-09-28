import { createClient } from 'redis';
import { config } from 'dotenv'
import {
    writeErrorLog,
} from './Logger'

config()

let RedisClient = null

if (Boolean(process.env.REDIS_STATUS)) {
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