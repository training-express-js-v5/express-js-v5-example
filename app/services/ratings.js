const { inspect } = require('util');

const errors = require('../errors');
const Rating = require('../models').ratings;
const { info, error } = require('../logger');

exports.createOrUpdateRating = ({ dataSearch, score, transaction }) =>
  Rating.findOrCreate({ where: dataSearch, defaults: { ...dataSearch, score }, transaction })
    .then(([rate, created]) => {
      if (created) info('Rate created successfully');
      const differentRate = rate.score !== score;
      if (!created && differentRate) {
        return rate.update({ score }, { transaction }).then(updatedRate => {
          info('Rate updated successfully');
          return updatedRate;
        });
      }
      return Promise.resolve(created || differentRate);
    })
    .catch(e => {
      error(`Error when trying to create/update rate, error: ${inspect(e)}`);
      throw errors.databaseError('Error creating rate');
    });

exports.findOneBy = (condition, options = {}) =>
  Rating.findOne({ where: condition, ...options }).catch(err => {
    error(inspect(err));
    throw errors.databaseError('Error when trying to obtain rate');
  });
