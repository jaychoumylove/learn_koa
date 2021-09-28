import knex from 'knex'
import bookshelf from 'bookshelf'
import paranoia from 'bookshelf-paranoia'
import connection from '../../knexfile'
import dotEnv from 'dotenv'

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
            console.warn('[DATABASE] ' + message)
        },
        error (message) {
            console.error('[DATABASE] ' + message)
        },
        deprecate (message) {
            console.error('[DATABASE] ' + message)
        },
        debug (message) {
            if (typeof message === 'string') {
                console.debug('[DATABASE] ' + message)
            } else {
                console.debug('[DATABASE]')
                console.debug(message)
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
