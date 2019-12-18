const { inspect } = require('util');

const errors = require('../errors');
const Users = require('../models').users;
const logger = require('../logger');

exports.createUser = newUser =>
  Users.create(newUser).catch(err => {
    logger.error(inspect(err));
    throw errors.userSignupError(`Error when trying to create user with properties ${inspect(newUser)}`);
  });

exports.findBy = condition =>
  Users.findOne({ where: condition }).catch(err => {
    logger.error(err.message);
    throw errors.databaseError('Error when trying to obtain user');
  });
