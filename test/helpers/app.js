const request = require('supertest');

const app = require('../../app.js');

exports.getResponse = ({ endpoint, header = {}, body, method = 'put' }) =>
  request(app)
    [method](endpoint) // eslint-disable-line
    .set(header)
    .send(body);
