/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('scores', table => {
    table.increments('id'); // adds an auto incrementing
    table.string('name', 128).notNullable();
    table.string('score', 128).notNullable();
    table.string('time', 128).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('movies');
};
