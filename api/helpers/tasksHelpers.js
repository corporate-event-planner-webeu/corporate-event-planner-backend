const db = require('../../data/dbConfig');

const getTasks = () => db('tasks');

const getTaskById = id => db('tasks')
    .where({ id })
    .first();

const getTasksForEvent = id => db('tasks').where({ event_id: id });

const addTask = (task) => db('tasks')
    .where({task_id: id })
    .insert(task)
    .then(ids => getTaskById(ids[0]));

const deleteTask = id => db('tasks')
    .where({ id })
    .del();

const updateTask = (task, id) => db('tasks')
    .where({ id })
    .update(task);

module.exports = {
  getTasks,
  getTaskById,
  getTasksForEvent,
  addTask,
  deleteTask,
  updateTask
};
