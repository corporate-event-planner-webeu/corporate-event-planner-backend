const express = require('express');
const bcrypt = require('bcryptjs');
const { restricted } = require('../middleware/restricted');

const router = express.Router();
const db = require('../data/dbConfig');
const errorMessage = require('../utils/errorMessage');
const responseMessage = require('../utils/responseMessage');


const Events = require('../api/helpers/eventsHelpers');
const Users = require('../api/helpers/usersHelpers');

// [GET] events from user
router.get('/', (req, res) => {
  if (req.query && req.query.user_id) {
    Events.getEventsFromUser(req.query.user_id)
        .then((events) => {
          if (!events) {
            res.status(404).json(errorMessage.eventsNotFound);
          } else {
            res.status(200).json(events);
          }
        })
        .catch((error) => {
          res.status(500).json(errorMessage.eventsNotRetrieved);
        });
  } else {
    Events.getEvents()
        .then((events) => {
            res.status(200).json(events);
        })
        .catch((error) => {
          res.status(500).json(errorMessage.eventsNotRetrieved);
        });
  }
});
