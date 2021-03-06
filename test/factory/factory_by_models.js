const { factory } = require('factory-girl');
const Chance = require('chance');
const db = require('../../app/models');

const modelsByName = Object.keys(db)
  .filter(modelName => modelName !== 'sequelize' && modelName !== 'Sequelize')
  .reduce((models, modelName) => {
    models[modelName] = db[modelName];
    return models;
  }, {});

const intValidation = (model, key) => {
  if (model.rawAttributes[key].unique) return factory.sequence(`${model.name}.${key}`, n => n);
  if (model.rawAttributes[key].validate) {
    const { validate } = model.rawAttributes[key];
    if (validate.max) return factory.chance('integer', { max: validate.max });
    if (validate.min) return factory.chance('integer', { min: validate.min });
    if (validate.len) return factory.chance('integer', { min: validate.len[0], max: validate.len[1] });
  }
  return factory.chance('integer', { min: 1, max: 10 });
};

const emailFactory = (model, key) => {
  if (model.rawAttributes[key].validate.isEmail) {
    if (model.rawAttributes[key].unique) {
      return factory.sequence(`${model.name}.email`, n => `dummy-user-${n}@wolox.com.ar`);
    }
    return factory.chance('email', { domain: 'wolox.com.ar' });
  }
  return false;
};

const stringValidation = (model, key) => {
  const chance = new Chance();
  if (model.rawAttributes[key].validate) {
    const { validate } = model.rawAttributes[key];
    if (emailFactory(model, key)) return emailFactory(model, key);

    if (validate.isAlphanumeric) return factory.chance('string', { pool: 'abcde6546' });

    if (validate.isNumeric) return factory.chance('string', { pool: '123456789' });

    if (validate.isLowercase) return factory.chance('string', { pool: 'abcdefghijklmnopqrstuvwxyz' });

    if (validate.isUppercase) return factory.chance('string', { pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' });

    if (validate.isIP) return factory.chance('ip');

    if (validate.contains) {
      const word = chance.string({ pool: 'abcdefghi' });
      return factory.sequence(`${model.name}`, n => `${validate.contains}${word}${n}`);
    }
  }
  return factory.chance('word');
};

const randomJsonCreate = () => {
  const chance = new Chance();
  const attributeName = chance.string({ pool: 'abcdefghi' });
  const value = factory.chance('string', { pool: 'abcdefghi' });
  return {
    [attributeName]: value
  };
};

// eslint-disable-next-line complexity
const generateByDatatypes = (model, key, attribute, predeterminatedValue = false) => {
  if (predeterminatedValue && key === predeterminatedValue.attribute) return predeterminatedValue.value;

  if (model.rawAttributes[key].defaultValue !== undefined) return model.rawAttributes[key].defaultValue;

  if (attribute[key] === 'INTEGER') return intValidation(model, key);

  if (attribute[key] === 'STRING') return stringValidation(model, key);

  if (attribute[key] === 'BOOLEAN') return factory.chance('bool');

  if (attribute[key] === 'TEXT') return factory.chance('paragraph');

  if (attribute[key] === 'DATE' || attribute[key] === 'DATEONLY') {
    // Sequelize will format this as its datatype, factory validates if its a valid value for DATE/DATEONLY field
    return factory.chance('date', { string: true });
  }

  if (attribute[key] === 'JSON') return randomJsonCreate();

  if (attribute[key] === 'FLOAT') return factory.chance('floating');

  if (attribute[key] === 'ENUM') return model.rawAttributes[key].values[0];

  // Here, you can add more Sequelize DATATYPES
  return factory.chance('string');
};

const buildByModel = (model, predeterminatedValue = false) => {
  const attributeType = {};
  const factorCreated = {};
  for (const key in model.rawAttributes) {
    if (key) {
      attributeType[key] = model.rawAttributes[key].type.key;
      if (!model.rawAttributes[key].primaryKey) {
        factorCreated[key] = generateByDatatypes(model, key, attributeType, predeterminatedValue);
      }
    }
  }
  return factorCreated;
};

exports.factoryByModel = (modelRequired, predeterminatedValue = false, options = {}) => {
  const modelRequested = modelsByName[modelRequired];
  const factorCreated = buildByModel(modelRequested, predeterminatedValue);
  return factory.define(modelRequested.name, db[modelRequested.name], factorCreated, options);
};

exports.factoryAllModels = () => {
  const models = modelsByName;
  return Object.keys(models).forEach(model => this.factoryByModel(model));
};

// eslint-disable-next-line id-length
exports.factoryWithPredeterminatedValue = (modelRequired, attribute, value) => {
  const predeterminatedValue = {
    attribute,
    value
  };
  return this.factoryByModel(modelRequired, predeterminatedValue);
};
