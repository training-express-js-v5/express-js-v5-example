const { inspect } = require('util');

const rp = require('request-promise');

const logger = require('../logger');
const { numbersApiError } = require('../errors');
const { NUMBERS_API_ERROR } = require('../constants/errors');
const { url } = require('../../config').common.apiNumbers;

exports.getRandomFact = () =>
  rp({
    method: 'GET',
    uri: `${url}/random/math`,
    json: true
  }).catch(err => {
    logger.error(inspect(err));
    throw numbersApiError(NUMBERS_API_ERROR);
  });
