import { bookshelfApp } from '../../database/knex'

const User = bookshelfApp.model('User', {
    hasTimestamps: true,
    tableName: 'users',
    hidden: ['password', 'deleted_at'],
    requireFetch: false,
    softDelete: true
})

export default User
