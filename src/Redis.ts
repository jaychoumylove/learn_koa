import { createClient } from 'redis';
import { config } from 'dotenv'
import {
    writeErrorLog,
} from './logger'

config()

let RedisClient = null

if (Boolean(process.env.REDIS_STATUS)) {
    const redisClient = createClient({
        db: process.env.REDIS_DB,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    });
    redisClient.on('error', err => {
        writeErrorLog('[REDIS]')
        writeErrorLog(err)
    })
}

export default RedisClient