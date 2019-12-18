const { sequelize } = require('../models');
const { createOrUpdateRate } = require('../services/rates');
const { info } = require('../logger');
const { incrementField } = require('../services/utils');

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
      await incrementField({ field: 'score', amount: score, transaction });
      info('User score updated successfully');
    }
    await transaction.commit();
  } catch (err) {
    if (transaction.rollback) await transaction.rollback();
    throw err;
  }
};
