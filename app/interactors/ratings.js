const { sequelize } = require('../models');
const { createOrUpdateRating } = require('../services/ratings');
const { info } = require('../logger');
const { incrementField } = require('../services/utils');

exports.rateWeet = async ({ weet, score, user }) => {
  let transaction = {};
  try {
    transaction = await sequelize.transaction();
    info('Trying to create or update rate');
    const newRating = await createOrUpdateRating({
      dataSearch: { ratingUserId: user.id, weetId: weet.id },
      transaction,
      score
    });
    if (newRating) {
      await incrementField({ instance: weet.user, field: 'score', amount: score, transaction });
      info('User score updated successfully');
    }
    await transaction.commit();
  } catch (err) {
    if (transaction.rollback) await transaction.rollback();
    throw err;
  }
};
