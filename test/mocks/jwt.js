jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

exports.successDecode = value => jwt.verify.mockReturnValueOnce(value);
exports.failDecode = value =>
  jwt.verify.mockImplementationOnce(() => {
    throw new Error(value);
  });
