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


// [POST] event
// will need restricted middleware
router.post('/', restricted, (req, res) => {
  const {
    event_title, event_description, event_date, event_time, attendees, budget,
  } = req.body;
  const user_id = req.decoded.subject;
  if (!event_title || !user_id) {
    res.status(400).json(errorMessage.missingEventInfo);
  }
  Events.addEvent({
    user_id,
    event_description,
    event_date,
    event_time,
    attendees,
    budget,
  })
      .then((newEvent) => {
        res.status(201).json({ ...newEvent, completed: Boolean(newEvent.completed), tasks: [], shopping_list: [], vendors: []});
      })
      .catch((error) => {
        res.status(500).json(errorMessage.eventNotAdded);
      });
});

// [DELETE] event by id
// will require restricted middleware
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Events.deleteEvent(id)
      .then((data) => {
        if (!data) {
          res.status(404).json(errorMessage.eventNotFound);
        } else {
          res.status(200).json(responseMessage.deleteEvent);
        }
      })
      .catch((error) => {
        res.status(500).json(errorMessage.eventNotDeleted);
      });
});
