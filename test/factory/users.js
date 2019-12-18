const { factory } = require('factory-girl');

const { factoryByModel } = require('./factory_by_models');

const modelName = 'users';

factoryByModel(modelName, false);

module.exports = {
  create: user => factory.create(modelName, { ...user, score: 0 }),
  build: user => factory.build(modelName, { ...user, score: 0 })
};
