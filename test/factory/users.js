const { factory } = require('factory-girl');

const { factoryByModel } = require('./factory_by_models');
const { encryptPassword } = require('../../app/helpers/users');

const modelName = 'users';

const options = {
  afterCreate: model =>
    encryptPassword(model.password).then(password => {
      model.password = password;
      return model.save();
    })
};

factoryByModel(modelName, false, options);

module.exports = {
  create: user => factory.create(modelName, user),
  build: user => factory.build(modelName, user)
};
