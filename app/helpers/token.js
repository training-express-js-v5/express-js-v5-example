const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const { domain, audience } = require('../../config').common.auth0;

// exports.generateToken = payload => jwt.sign(payload, secret, { expiresIn: expirationTime });

// exports.validateToken = token => jwt.verify(token, secret);

const validateToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`
  }),
  audience,
  issuer: `https://${domain}/`,
  algorithms: ['RS256']
});

exports.checkToken = [validateToken];
