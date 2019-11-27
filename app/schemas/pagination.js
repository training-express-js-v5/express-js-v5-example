const errors = require('../constants/errors');

exports.paginationSchema = {
  limit: {
    in: ['query'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_LIMIT_ERROR
    },
    custom: {
      options: value => value.replace(/'/g, '') > 0,
      errorMessage: 'Limit can not be less than one and has to be a number.'
    },
    trim: true
  },
  page: {
    in: ['query'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_PAGE_ERROR
    },
    custom: {
      options: value => value.replace(/'/g, '') > 0,
      errorMessage: 'Page can not be less than one and has to be a number.'
    },
    trim: true
  }
};
