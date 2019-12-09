const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const { authenticationError, loginError } = require('../errors');
const logger = require('../logger');
const { domain, audience } = require('../../config').common.auth0;
// const { header_name } = require('../../config').common.session;
const { AUTHENTICATION_ERROR_MSG } = require('../constants/errors');
// const { validateToken } = require('../helpers/token');
const { findBy } = require('../services/users');

// exports.authenticate = (req, _, next) => {
//   const token = req.headers[header_name];
//   if (!token) return next(authenticationError(AUTHENTICATION_ERROR_MSG));
//   try {
//     const decodeToken = validateToken(token.split(' ')[1]);
//     return findBy({ email: decodeToken.email })
//       .then(user => {
//         if (!user) return next(authenticationError(AUTHENTICATION_ERROR_MSG));
//         logger.info(`User ${user.username} authenticated successfully`);
//         req.user = { ...user.dataValues };
//         return next();
//       })
//       .catch(next);
//   } catch (err) {
//     return next(
//       authenticationError(
//         err.name === 'TokenExpiredError' ? TOKEN_EXPIRED_ERROR_MSG : INVALID_TOKEN_ERROR_MSG
//       )
//     );
//   }
// };

// exports.generateToken = payload => jwt.sign(payload, secret, { expiresIn: expirationTime });

// exports.validateToken = token => jwt.verify(token, secret);

const validateToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`
  }),
  aud: audience,
  issuer: `https://${domain}/`,
  algorithms: ['RS256']
});

exports.checkToken = [validateToken];

exports.checkUser = (req, _, next) =>
  findBy({ email: req.body.email }).then(user => {
    if (!user) {
      logger.error('Invalid username');
      next(loginError('Username or password invalid'));
    }
    req.user = user;
    next();
  });

exports.checkAdminPermissions = ({ user }, _, next) =>
  user.admin ? next() : next(authenticationError(AUTHENTICATION_ERROR_MSG));
