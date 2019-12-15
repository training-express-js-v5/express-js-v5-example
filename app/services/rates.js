const { inspect } = require('util');

const errors = require('../errors');
const Rate = require('../models').rates;
const logger = require('../logger');

exports.createRate = (newRate, transaction) => {
  console.log('newRate', newRate);
  Rate.create(
    newRate,
    { fields: ['rating_user_id', 'weet_id', 'score'], updateOnDuplicate: ['rating_user_id', 'weet_id'] },
    { transaction }
  ).catch(err => {
    logger.error(inspect(err));
    throw errors.databaseError('Error when trying to create rate');
  });
};
