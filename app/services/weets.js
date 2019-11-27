const { inspect } = require('util');

const errors = require('../errors');
const Weet = require('../models').weets;
const logger = require('../logger');

exports.createWeet = newWeet =>
  Weet.create(newWeet).catch(err => {
    logger.error(inspect(err));
    throw errors.databaseError('Error when trying to create weet');
  });

exports.getAllWeets = limit =>
  Weet.findAll({ limit }).catch(error => {
    logger.error(inspect(error));
    throw errors.databaseError('Error when trying to get weets');
  });
