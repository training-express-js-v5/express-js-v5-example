const logger = require('../logger');
const errors = require('../errors');
const { userSerializer } = require('../serializers/users');
const { createUser } = require('../services/users');
const { encryptPassword, comparePassword } = require('../services/bcrypt');
const { generateToken } = require('../helpers/token');

exports.signUp = ({ body }, res, next) =>
  encryptPassword(body.password)
    .then(hash => createUser({ ...body, password: hash, score: 0 }))
    .then(createdUser => {
      logger.info(`The user ${createdUser.name} was created successfully`);
      return res.status(201).send(userSerializer(createdUser));
    })
    .catch(next);

exports.logIn = ({ body: { email, password }, user }, res, next) =>
  comparePassword(password, user.password)
    .then(validPassword => {
      if (!validPassword) {
        logger.error('Invalid password');
        throw errors.loginError('Username or password invalid');
      }
      return generateToken({ email });
    })
    .then(token => res.send({ token }))
    .catch(next);
