const errors = require('../constants/errors');

exports.userSignUpSchema = {
  name: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_NAME_ERROR
    },
    trim: true,
    isString: true
  },
  lastName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_LASTNAME_ERROR
    },
    trim: true,
    isString: true
  },
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_EMAIL_ERROR
    },
    trim: true,
    isEmail: true,
    errorMessage: errors.INVALID_EMAIL_ERROR
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_PASSWORD_ERROR
    },
    isLength: {
      options: { min: 8, max: 30 },
      errorMessage: errors.INVALID_PASSWORD_LENGTH_ERROR
    },
    isAlphanumeric: true,
    errorMessage: errors.INVALID_PASSWORD_ERROR
  }
};

exports.userLogInSchema = {
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_EMAIL_ERROR
    },
    trim: true,
    isEmail: true,
    errorMessage: errors.INVALID_EMAIL_ERROR
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_PASSWORD_ERROR
    },
    isLength: {
      options: { min: 8, max: 30 },
      errorMessage: errors.INVALID_PASSWORD_LENGTH_ERROR
    },
    isAlphanumeric: true,
    errorMessage: errors.INVALID_PASSWORD_ERROR
  }
};
