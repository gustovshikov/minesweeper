/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('scores').del();
  await knex('scores').insert([
    {
      name: 'erat',
      score: '80',
      time: '200',
    },
    {
      name: 'erat vel',
      score: '80',
      time: '200',
    },
    {
      name: 'erat vel',
      score: '80',
      time: '200',
    },
    {
      name: 'erat vel',
      score: '80',
      time: '200',
    },
    {
      name: 'erat vel',
      score: '80',
      time: '200',
    },
  ]);
};
