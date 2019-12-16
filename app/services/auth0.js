const rp = require('request-promise');

const { domain, clientId, clientSecret, grantType } = require('../../config').common.auth0;
const { CONTENT_TYPE_TOKEN_NAME, CONTENT_TYPE_TOKEN_VALUE } = require('../constants/auth0');
const { auth0Handle } = require('../handlers/auth0');

exports.getToken = code =>
  rp({
    method: 'POST',
    headers: {
      [CONTENT_TYPE_TOKEN_NAME]: [CONTENT_TYPE_TOKEN_VALUE]
    },
    form: {
      grant_type: grantType,
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `https://${domain}/login`
    },
    uri: `https://${domain}/oauth/token`,
    json: true
  }).catch(auth0Handle);
