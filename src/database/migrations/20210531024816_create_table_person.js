/**
 * @Notice open up to
 */
// import { Knex } from "knex";

/**
 * @param {Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.timestamp('deleted_at');
    table.timestamps();
  });
};

/**
 * @param {Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
