const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.USER_SIGNUP_ERROR]: 401,
  [errors.AUTHENTICATION_ERROR]: 401,
  [errors.LOGIN_ERROR]: 401,
  [errors.SCHEMA_ERROR]: 422,
  [errors.DEFAULT_ERROR]: 500,
  [errors.HASH_ERROR]: 500,
  [errors.NUMBERS_API_ERROR]: 500,
  [errors.AUTH0_SIGN_IN_ERROR]: 500,
  [errors.AUTH0_INVALID_CODE]: 422,
  [errors.DATABASE_ERROR]: 503
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(error.status || DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({
    message: error.message,
    internal_code: error.internalCode || error.code
  });
};
