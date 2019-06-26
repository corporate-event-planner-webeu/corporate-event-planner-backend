const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { restricted, jwtKey } = require('.././middleware/restricted');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

const path = require('../utils/path');
const auth = require('../routes/authRoutes');
const users = require('../routes/usersRoutes');
const events = require('../routes/eventsRoutes');
const tasks = require('../routes/tasksRoutes');
const shopping = require('../routes/shoppingListRoutes');
const vendors = require('../routes/vendorsRoutes');

server.use(path.auth, auth);
server.use(path.users, users);
server.use(path.events, events);
server.use(path.tasks, tasks);
server.use(path.shopping, shopping);
server.use(path.vendors, vendors);

server.get('/api', (req, res) => {
  res.status(200).json({ data: 'The server is up and running!' });
});

module.exports = server;
