const request = require('supertest');

const models = require('../../app/models');

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

exports.truncateDatabase = () => Promise.all(tables.map(truncateTable));

exports.getResponse = ({ endpoint, header = {}, body, method = 'put' }) => {
  // eslint-disable-next-line global-require
  const app = require('../../app.js');
  return request(app)
    [method](endpoint) // eslint-disable-line
    .set(header)
    .send(body);
};
