const request = require('supertest');

const app = require('../../app.js');
const models = require('../../app/models');

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

exports.truncateDatabase = () => Promise.all(tables.map(truncateTable));

exports.getResponse = ({ endpoint, header = {}, body, method = 'put' }) =>
  request(app)
    [method](endpoint) // eslint-disable-line
    .set(header)
    .send(body);
