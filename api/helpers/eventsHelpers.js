const db = require('../../data/dbConfig');

const getEvents = () => db('events');

const getEventById = id => db('events')
    .where({ id })
    .first();

const getEventsFromUser = id => db('events').where({ user_id: id });

const addEvent = event => db('events')
    .insert(event)
    .then(ids => getEventById(ids[0]));

const deleteEvent = id => db('events')
    .where({ id })
    .del();

const updateEvent = (event, id) => db('events')
    .where({ id })
    .update(event);

module.exports = {
  getEvents,
  getEventById,
  getEventsFromUser,
  addEvent,
  deleteEvent,
  updateEvent,
};

