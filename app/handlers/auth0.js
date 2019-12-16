const { inspect } = require('util');

const logger = require('../logger');

const { auth0SignInError, auth0InvalidCode, auth0BadRequest } = require('../errors');

exports.auth0Handle = err => {
  logger.error(inspect(err));
  if (err.statusCode) {
    if (err.statusCode >= 500) {
      throw auth0SignInError('Error login user');
    } else if (err.error.error.includes('grant')) {
      throw auth0InvalidCode('The code is not valid');
    } else {
      throw auth0BadRequest('Error when trying to login user in auth0');
    }
  } else {
    throw auth0SignInError('Error login user');
  }
};
