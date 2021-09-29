import { config } from 'dotenv'

config()

export = {
    url: process.env.DATABASE_CONNECT,
    type: 'postgres',
    entities: [
        'src/entity/**/*.ts',
    ],
    migrations: [
        'src/migrations/**/*.ts',
    ],
    subscribers: [
        'src/subscriber/**/*.ts',
    ],
    cli: {
        migrationsDir: 'src/entity',
        entitiesDir: 'src/migrations',
        subscribersDir: 'src/subscriber',
    },
    synchronize: true,
    logging: true,
};