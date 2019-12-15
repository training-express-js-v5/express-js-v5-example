const { inspect } = require('util');

const errors = require('../errors');
const Rates = require('../models').rates;
const logger = require('../logger');

exports.createRate = (newRate, transaction) =>
  Rates.findOne({ where: { weetId: newRate.weetId, ratingUserId: newRate.ratingUserId } }, { transaction })
    .then(rate => {
      if (rate) {
        rate.update(newRate, { transaction });
        return;
      }
      Rates.create(newRate, { transaction });
    })
    .catch(err => {
      logger.error(inspect(err));
      throw errors.databaseError('Error when trying to create rate');
    });
