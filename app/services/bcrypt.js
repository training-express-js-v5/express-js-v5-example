const { inspect } = require('util');

const bcrypt = require('bcrypt');

const errors = require('../errors');
const logger = require('../logger');
const { DEFAULT_ROUNDS } = require('../constants/bcrypt');

exports.encryptPassword = password =>
  bcrypt.hash(password, DEFAULT_ROUNDS).catch(err => {
    logger.error(inspect(err));
    throw errors.hashError('Error hashing password');
  });

exports.comparePassword = (password, hash) =>
  bcrypt.compare(password, hash).catch(err => {
    logger.error(inspect(err));
    throw errors.hashError('Error comparing passwords');
  });
