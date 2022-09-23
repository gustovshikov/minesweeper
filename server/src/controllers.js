const knex = require('knex')(require('../knexfile.js')['development']);

const getAllScores = async () => {
  return knex('scores').select('*');
};

const postScore = async props => {
  console.log('post Score', props);
  return knex('scores').insert(props, ['*']);
};

const deleteScoreByID = async id => {
  await knex('scores').where('id', id).del();
  return 'Score deleted successfully';
};

module.exports = {
  getAllScores,
  postScore,
  deleteScoreByID,
};
