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

server.use(path.auth, auth);
server.use(path.users, users);
server.use(path.events, events);

server.get('/api', (req, res) => {
  res.status(200).json({ data: 'The server is up and running!' });
});

module.exports = server;
