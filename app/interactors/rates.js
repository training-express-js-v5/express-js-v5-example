const errors = require('../errors');
const { sequelize } = require('../models');
const { updateUserScore } = require('../services/users');
const { createRate } = require('../services/rates');

exports.rateWeet = async ({ weetId, score, user }) => {
  if (!['-1', '0', '1'].includes(score)) {
    throw errors.defaultError('The given score was not valid');
  }

  const transaction = await sequelize.transaction();

  try {
    await Promise.all([
      createRate({ weetId, score, ratingUserId: user.id }, transaction),
      updateUserScore({ weetId, change: score }, transaction)
    ]);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new Error('error when rating');
  }
};
