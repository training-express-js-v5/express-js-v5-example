const { REQUIRED_SCORE, INVALID_SCORE_ERROR, WEET_ID_ERROR_MSG } = require('../constants/errors');

exports.rateSchema = {
  score: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: REQUIRED_SCORE
    },
    custom: {
      options: value => [-1, 1].includes(value),
      errorMessage: INVALID_SCORE_ERROR
    }
  },
  weetId: {
    in: ['params'],
    isInt: true,
    toInt: true,
    exist: true,
    errorMessage: WEET_ID_ERROR_MSG
  }
};
