const { inspect } = require('util');

const { databaseError } = require('../errors');
const { error } = require('../logger');

exports.incrementField = ({ field, amount, transaction, instance }) =>
  instance.increment(field, { by: amount, transaction }).catch(err => {
    error(`Error when trying to increment field ${field}, error : ${inspect(err)}`);
    throw databaseError(err.message);
  });
