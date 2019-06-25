const express = require('express');
const bcrypt = require('bcryptjs');
const { restricted } = require('../middleware/restricted');

const router = express.Router();
const db = require('../data/dbConfig');
const errorMessage = require('../utils/errorMessage');
const responseMessage = require('../utils/responseMessage');


const Events = require('../api/helpers/eventsHelpers');
const Tasks = require('../api/helpers/tasksHelpers');

// [GET] tasks for event
router.get('/', (req, res) => {
  if (req.query && req.query.event_id) {
    Tasks.getTasksForEvent(req.query.event_id)
        .then((tasks) => {
          if (!tasks) {
            res.status(404).json(errorMessage.tasksNotFound);
          } else {
            res.status(200).json(tasks);
          }
        })
        .catch((error) => {
          res.status(500).json(errorMessage.tasksNotRetrieved);
        });
  } else {
    Tasks.getTasks()
        .then((tasks) => {
          res.status(200).json(tasks);
        })
        .catch((error) => {
          res.status(500).json(errorMessage.tasksNotRetrieved);
        });
  }
});

//[GET] Task by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Tasks.getTaskById(id)
      .then((task) => {
        if (!task) {
          res.status(404).json(errorMessage.taskNotFound);
        } else {
          res.status(200).json(task);
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.taskNotRetrieved);
      });
});
