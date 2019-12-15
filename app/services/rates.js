const { inspect } = require('util');

const errors = require('../errors');
const Rate = require('../models').rates;
const logger = require('../logger');

exports.createRate = (newRate, transaction) =>
  Rate.findOne({ where: { weetId: newRate.weetId, ratingUserId: newRate.ratingUserId } }, { transaction })
    .then(rate => {
      console.log('insterting');
      if (rate) {
        rate.update(newRate, { transaction });
        return;
      }
      console.log('updating');
      Rate.create(newRate, { transaction });
    })
    .catch(err => {
      logger.error(inspect(err));
      throw errors.databaseError('Error when trying to create rate');
    });
