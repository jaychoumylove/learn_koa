// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      database: "postgres",
      user: "postgres",
      password: "password",
    },
    // client: "mysql",
    // connection: {
    //   host: "localhost",
    //   port: 3306,
    //   database: "postgres",
    //   user: "user",
    //   password: "password",
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
      database: "postgres",
      user: "postgres",
      password: "password",
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
      database: "postgres",
      user: "postgres",
      password: "password",
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
