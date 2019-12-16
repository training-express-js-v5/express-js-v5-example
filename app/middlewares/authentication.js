const { authenticationError, loginError, weetNotFound } = require('../errors');
const logger = require('../logger');
const { header_name } = require('../../config').common.session;
const {
  AUTHENTICATION_ERROR_MSG,
  INVALID_TOKEN_ERROR_MSG,
  TOKEN_EXPIRED_ERROR_MSG,
  WEET_NOT_FOUND_MSG
} = require('../constants/errors');
const { validateToken } = require('../helpers/token');
const { findBy } = require('../services/users');
const { getByWithUser } = require('../services/weets');

exports.authenticate = (req, _, next) => {
  const token = req.headers[header_name];
  if (!token) return next(authenticationError(AUTHENTICATION_ERROR_MSG));
  try {
    const decodeToken = validateToken(token.split(' ')[1]);
    return findBy({ email: decodeToken.email })
      .then(user => {
        if (!user) return next(authenticationError(AUTHENTICATION_ERROR_MSG));
        logger.info(`User ${user.username} authenticated successfully`);
        req.user = { ...user.dataValues };
        return next();
      })
      .catch(next);
  } catch (err) {
    return next(
      authenticationError(
        err.name === 'TokenExpiredError' ? TOKEN_EXPIRED_ERROR_MSG : INVALID_TOKEN_ERROR_MSG
      )
    );
  }
};

exports.checkUser = (req, _, next) =>
  findBy({ email: req.body.email }).then(user => {
    if (!user) {
      logger.error('Invalid username');
      next(loginError('Username or password invalid'));
    }
    req.user = user;
    next();
  });

exports.checkAdminPermissions = ({ user }, _, next) =>
  user.admin ? next() : next(authenticationError(AUTHENTICATION_ERROR_MSG));

exports.checkWeet = (req, _, next) =>
  getByWithUser({ id: req.params.weetId })
    .then(weet => {
      if (!weet) throw weetNotFound(WEET_NOT_FOUND_MSG);
      req.weet = weet;
      next();
    })
    .catch(next);
