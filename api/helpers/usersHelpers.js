const db = require('../../data/dbConfig');

const getUsers = () => db('users');

const getUserById = id => db('users')
    .where({ id })
    .first();

const deleteUser = id => db('users').where({ id }).del();

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
};
