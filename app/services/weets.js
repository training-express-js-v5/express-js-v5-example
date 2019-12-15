const { inspect } = require('util');

const errors = require('../errors');
const Weets = require('../models').weets;
const logger = require('../logger');

exports.createWeet = newWeet =>
  Weets.create(newWeet).catch(err => {
    logger.error(inspect(err));
    throw errors.databaseError('Error when trying to create weet');
  });

exports.getAllWeets = (limit = 10, page = 1) =>
  Weets.findAll({ offset: (page - 1) * limit || 0, limit }).catch(error => {
    logger.error(inspect(error));
    throw errors.databaseError('Error when trying to get weets');
  });
