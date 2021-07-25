/**
 * @Notice open up to
 */

// import { Knex } from "knex";
// import faker from "Faker";
const faker = require("Faker");

const tableName = "users";
const insertRowLength = 400;

let insertDatas = [];
const currentDate = new Date();

while (insertDatas.length < insertRowLength) {
  const male = Math.random() > 0.5;
  insertDatas.push({
    first_name: male
      ? faker.Name.firstNameMale()
      : faker.Name.firstNameFemale(),
    last_name: faker.Name.lastName(),
    created_at: currentDate,
    updated_at: currentDate,
  });
}

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = function (knex) {
  return knex(tableName)
    .del()
    .then(function () {
      return knex(tableName).insert(insertDatas);
    });
};
