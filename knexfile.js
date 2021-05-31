// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      database: "learn_koa",
      user: "postgres",
      password: "root",
    },
    // client: "mysql",
    // connection: {
    //   host: "localhost",
    //   port: 3306,
    //   database: "learn_koa",
    //   user: "root",
    //   password: "root",
    // },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      database: "learn_koa",
      user: "postgres",
      password: "root",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      database: "learn_koa",
      user: "postgres",
      password: "root",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
  },
};
