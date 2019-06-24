const errorMessage = {
  missingFields: { errorMessage: 'Missing required fields.' },
  registerUser: { errorMessage: 'The user could not be created.' },
  invalidUser: { errorMessage: 'Invalid user.' },
  duplicateEmail: { errorMessage: 'This email has already been taken.' },
  missingCredentials: { errorMessage: 'Missing email or password.' },
  invalidCredentials: { errorMessage: 'Invalid credentials.' },
  loginUnsuccessful: { errorMessage: 'Login Unsuccessful.' },
  failedDuplicateCheck: { errorMessage: 'There was an error while checking for duplicates.' },
  usersNotRetrieved: { errorMessage: 'The users could not be retrieved.' },
  userNotRetrieved: { errorMessage: 'The user information could not be retrieved.' },
  userNotFound: { errorMessage: 'The user with the specified ID does not exist.' },
  userNotRemoved: { errorMessage: 'The user could not be removed.' },
  userNotUpdated: { errorMessage: 'The user information could not be modified.' },
};

module.exports = errorMessage;
