jest.mock('request-promise');
const rp = require('request-promise');

exports.mockSuccessRequest = body => rp.mockResolvedValueOnce(body);
exports.mockFailedRequest = err => rp.mockRejectedValueOnce(err);
