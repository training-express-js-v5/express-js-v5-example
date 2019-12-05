const { getResponse } = require('./app');
const createWeet = require('../factory/weets').create;

exports.requestWeetsByPages = (limit, page) => {
  let query = '';
  if (limit && page) {
    query = `?limit=${limit}&page=${page}`;
  } else if (limit && !page) {
    query = `?limit=${limit}`;
  } else if (!limit && page) {
    query = `?page=${page}`;
  }
  const endpoint = query.length > 0 ? `/weets${query}` : '/weets';
  return getResponse({
    endpoint,
    method: 'get',
    header: { authorization: 'Bearer token' }
  });
};

exports.createWeetsByQuantity = async quantity => {
  for (let i = 0; i < quantity; i++) {
    await createWeet();
  }
};
