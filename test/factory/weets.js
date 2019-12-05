const { factory } = require('factory-girl');

const { factoryByModel } = require('./factory_by_models');

const modelName = 'weets';

factoryByModel(modelName, false);

module.exports = {
  create: () => factory.create(modelName, { userId: 1 }),
  build: () => factory.build(modelName),
  createMany: quantity => factory.createMany(modelName, quantity, { userId: 1 })
};
