const express = require('express');
const bcrypt = require('bcryptjs');
// const { authenticate } = require('../authenticate');

const router = express.Router();
const db = require('../data/dbConfig');
const Users = require('../api/helpers/usersHelpers');
const errorMessage = require('../utils/errorMessage');
const responseMessage = require('../utils/responseMessage');

// [GET] all users
router.get('/', (req, res) => {
  Users.getUsers()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json(error.usersNotRetrieved);
      });
});

// [GET] user by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Users.getUserById(id)
      .then((user) => {
        if (!user) {
          res.status(404).json(error.userNotFound);
        } else {
          res.status(200).json(user);
        }
      })
      .catch((error) => {
        res.status(500).json(error.userNotRetrieved);
      });
});

// [DELETE] a user by id
// will need to add restricted middleware
router.delete('/:id',  (req, res) => {
  const { id } = req.params;
  Users.deleteUser(id)
      .then((data) => {
        if (!data) {
          res.status(404).json(error.userNotFound);
        } else {
          res.status(200).json(responseMessage.deleteUser);
        }
      })
      .catch((error) => {
        res.status(500).json(error.userNotRemoved);
      });
});

// [PUT] a user by id
// will need restricted middleware
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (user.password) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
  }
  Users.updateUser(user, id)
      .then((data) => {
        if (!data) {
          res.status(404).json(error.userNotFound);
        } else {
          if (user.password) {
            user.password = undefined;
          }
          res.status(200).json({ user: { id, ...user } });
        }
      })
      .catch((error) => {
        res.status(500).json(error.userNotUpdated);
      });
});

module.exports = router;
