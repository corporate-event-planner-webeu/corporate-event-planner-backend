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

// [GET] event by id
// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   Events.getEventById(id)
//       .then((event) => {
//         if (!event) {
//           res.status(404).json(errorMessage.eventNotFound);
//         } else {
//           res.status(200).json(event);
//         }
//       })
//       .catch((error) => {
//         res.status(500).json(errorMessage.eventNotRetrieved);
//       });
// });

// [GET] event by id with tasks
router.get('/:id', (req, res) => {
  const {id} = req.params;
  db('events')
      .where({id: id})
      .first()
      .then((event) => {
        if (!event) {
          res.status(404).json(errorMessage.eventNotFound);
        } else {
          db('tasks')
              .where({event_id: id})
              .select('id', 'task_name', 'task_completed')
              .then((tasks => {
                const tasksWithCompletedBooleans = tasks.map(task => ({
                  ...task,
                  task_completed: Boolean(task.task_completed)
                }));
                const eventWithActions = {
                  ...event,
                  tasks: tasksWithCompletedBooleans
                };
                res.status(200).json(eventWithActions);
              }));
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.eventNotRetrieved);
      });
});
