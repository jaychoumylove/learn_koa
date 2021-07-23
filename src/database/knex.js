import knex from 'knex'
import bookshelf from 'bookshelf'
import paranoia from 'bookshelf-paranoia'
import connection from '../../knexfile'
import dotEnv from 'dotenv'

dotEnv.config()

let useConnection = null
switch (process.env.APP_ENV) {
    case 'test':
    case 'testing':
    case 'dev':
    case 'development':
        useConnection = connection.development
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

const knexApp = knex(useConnection)

const bookshelfApp = bookshelf(knexApp)
bookshelfApp.plugin(paranoia, {
    field: 'deleted_at'
})

export {
    knexApp,
    bookshelfApp
}
