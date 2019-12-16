const { inspect } = require('util');

const { transactionError } = require('../errors');
const { sequelize } = require('../models');
const { createOrUpdateRate } = require('../services/rates');
const { info, error } = require('../logger');

exports.rateWeet = async ({ weet, score, user }) => {
  let transaction = {};
  try {
    transaction = await sequelize.transaction();
    info('Trying to create or update rate');
    const newRate = await createOrUpdateRate({
      dataSearch: { ratingUserId: user.id, weetId: weet.id },
      transaction,
      score
    });
    if (newRate) {
      await weet.user.increment('score', { by: score, transaction });
      info('User score updated successfully');
    }
    await transaction.commit();
  } catch (err) {
    error(`Error in transaction, error : ${inspect(err)}`);
    if (transaction) await transaction.rollback();
    throw transactionError('Error executing transaction');
  }
};
