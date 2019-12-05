exports.paginationSchema = {
  limit: {
    in: ['query'],
    isInt: {
      options: { min: 1 },
      errorMessage: 'Limit can not be less than one and has to be a number.'
    },
    toInt: true,
    optional: true,
    trim: true
  },
  page: {
    in: ['query'],
    isInt: {
      options: { min: 1 },
      errorMessage: 'Page can not be less than one and has to be a number.'
    },
    toInt: true,
    optional: true,
    trim: true
  }
};
