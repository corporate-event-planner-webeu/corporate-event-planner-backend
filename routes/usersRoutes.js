const express = require('express');
// const bcrypt = require('bcryptjs');
// const { authenticate } = require('../authenticate');

const router = express.Router();
const db = require('../data/dbConfig');
const Users = require('../api/helpers/usersHelpers');

router.get('/', (req, res) => {
  Users.getUsers()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json({ error: 'The users could not be retrieved.' });
      });
});

module.exports = router;
