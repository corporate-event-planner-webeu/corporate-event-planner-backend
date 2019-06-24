const db = require('../../data/dbConfig');

const getUsers = () => db('users');

const getUserById = id => db('users')
    .where({ id })
    .first();

module.exports = {
  getUsers,
  getUserById,
};
