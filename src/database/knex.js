import knex from 'knex'
import bookshelf from 'bookshelf'
import paranoia from 'bookshelf-paranoia'
import connection from '../../knexfile'
import dotEnv from 'dotenv'
import {
    writeDebugLog,
    writeErrorLog,
    writeWarnLog
} from '../logger'

dotEnv.config()

let useConnection = null, debug = false
switch (process.env.APP_ENV) {
    case 'test':
    case 'testing':
    case 'dev':
    case 'development':
        useConnection = connection.development
        debug = true
        break

    case 'prod':
    case 'production':
        useConnection = connection.production
        break

    case 'staging':
        useConnection = connection.staging
        break

    default:
        throw new Error('PLEASE SET ENVIRONMENT!')
}

const logConfig = {
    log: {
        warn (message) {
            writeWarnLog('[DATABASE] ' + message)
        },
        error (message) {
            writeErrorLog('[DATABASE] ' + message)
        },
        deprecate (message) {
            writeErrorLog('[DATABASE] ' + message)
        },
        debug (message) {
            if (typeof message === 'string') {
                writeDebugLog('[DATABASE] ' + message)
            } else {
                writeDebugLog('[DATABASE]')
                writeDebugLog(message)
            }
        },
    }
}

const knexApp = knex({ ...useConnection, ...logConfig, debug })

const bookshelfApp = bookshelf(knexApp)
bookshelfApp.plugin(paranoia, {
    field: 'deleted_at'
})

export {
    knexApp,
    bookshelfApp
}
