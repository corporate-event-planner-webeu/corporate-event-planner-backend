const db = require('../data/dbConfig');
const path = require('../utils/path');
const errorMessage = require('../utils/errorMessage');

const checkForDuplicateEmail = (req, res, next) => {
  const newUserEmail = req.body.email;
  db('users').select('email')
      .then(emails => {
        const filteredEmails = emails.filter(email => email.email === newUserEmail);
        if (filteredEmails.length > 0) {
          res.status(400).json(errorMessage.duplicateEmail);
        } else {
          next();
        }
      })
      .catch(error => res.status(500).json(error.failedDuplicateCheck));
};

module.exports = checkForDuplicateEmail;
