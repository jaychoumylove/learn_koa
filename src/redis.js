import { createClient } from 'async-redis'
import dotEnv from 'dotenv'
import {
    writeErrorLog,
} from './middleware/logger'

dotEnv.config()

let RedisClient = null

if (Boolean(process.env.REDIS_STATUS)) {
    RedisClient = createClient({
        db: process.env.REDIS_DB,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    })
    RedisClient.on('error', err => {
        writeErrorLog('[REDIS]')
        writeErrorLog(err)
    })
}

export default RedisClient