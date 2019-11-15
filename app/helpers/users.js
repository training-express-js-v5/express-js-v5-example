const bcrypt = require('bcryptjs');

const errors = require('../errors');
const logger = require('../logger');

const rounds = 10;

exports.encryptPassword = password =>
  bcrypt.hash(password, rounds).catch(err => {
    logger.error(err.message);
    throw errors.hashError('Error hashing password');
  });

exports.comparePassword = (password, hash) =>
  bcrypt.compare(password, hash).catch(err => {
    logger.error(err.message);
    throw errors.userSigninError('Invalid password');
  });
