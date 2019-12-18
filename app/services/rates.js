const { inspect } = require('util');

const errors = require('../errors');
const Rate = require('../models').rates;
const { info, error } = require('../logger');

exports.createOrUpdateRate = ({ dataSearch, score, transaction }) =>
  Rate.findOrCreate({ where: dataSearch, defaults: { ...dataSearch, score }, transaction })
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
  Rate.findOne({ where: condition, ...options }).catch(err => {
    error(inspect(err));
    throw errors.databaseError('Error when trying to obtain rate');
  });
