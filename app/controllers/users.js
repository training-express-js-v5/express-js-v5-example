const logger = require('../logger');
const { userSerializer } = require('../serializers/users');
const { encryptPassword } = require('../services/bcrypt');
const { getToken } = require('../services/auth0');
const { createUser } = require('../services/users');

exports.signUp = ({ body }, res, next) =>
  encryptPassword(body.password)
    .then(hash => createUser({ ...body, password: hash }))
    .then(createdUser => {
      logger.info(`The user ${createdUser.name} was created successfully`);
      return res.status(201).send(userSerializer(createdUser));
    })
    .catch(next);

exports.logIn = ({ body: { code } }, res, next) =>
  getToken(code)
    .then(tokenData => res.send(tokenData))
    .catch(next);
