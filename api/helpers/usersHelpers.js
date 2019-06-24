const db = require('../../data/dbConfig');

const getUsers = () => db('users');

module.exports = {
  getUsers
};
