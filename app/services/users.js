const { inspect } = require('util');

const errors = require('../errors');
const Users = require('../models').users;
const Weets = require('../models').weets;
const logger = require('../logger');

exports.createUser = newUser =>
  Users.create(newUser).catch(err => {
    logger.error(err.message);
    throw errors.userSignupError(`Error when trying to create user with properties ${inspect(newUser)}`);
  });

exports.findBy = condition =>
  Users.findOne({ where: condition }).catch(err => {
    logger.error(err.message);
    throw errors.databaseError('Error when trying to obtain user');
  });

exports.updateUserScore = ({ weetId, change }, transaction) => {
  console.log('weetId', weetId);
  Weets.findOne({ where: { id: weetId }, include: [{ model: Users, as: 'user' }] })
    .then(weet => {
      weet.user.update({ score: Number(weet.user.score) + Number(change) }, { transaction });
    })
    .catch(err => {
      logger.error(err.message);
      throw errors.databaseError('Error when trying to update user score');
    });
};
