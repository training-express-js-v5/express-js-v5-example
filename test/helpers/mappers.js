const { getResponse } = require('./app');

exports.requestWeetsByPages = (limit, page) =>
  getResponse({
    endpoint: `/weets?limit=${limit}&page=${page}`,
    method: 'get',
    header: { authorization: 'Bearer token' }
  });
