jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

exports.successDecode = value => jwt.verify.mockReturnValueOnce(value);

exports.failDecode = value => jwt.verify.mockRejectedValueOnce(value);

exports.successSignIn = value => jwt.sign.mockResolvedValueOnce(value);

exports.failSignIn = value => jwt.sign.mockRejectedValueOnce({ message: value });
