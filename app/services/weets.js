const { inspect } = require('util');

const errors = require('../errors');
const Weet = require('../models').weets;
const User = require('../models').users;
const logger = require('../logger');

exports.createWeet = newWeet =>
  Weet.create(newWeet).catch(err => {
    logger.error(inspect(err));
    throw errors.databaseError('Error when trying to create weet');
  });

exports.getAllWeets = (limit = 10, page = 1) =>
  Weet.findAll({ offset: (page - 1) * limit || 0, limit }).catch(error => {
    logger.error(inspect(error));
    throw errors.databaseError('Error when trying to get weets');
  });

exports.getByWithUser = condition =>
  Weet.findOne({
    where: condition,
    include: [{ model: User, as: 'user' }]
  }).catch(error => {
    logger.error(inspect(error));
    throw errors.databaseError('Error when trying to get specific weet');
  });
