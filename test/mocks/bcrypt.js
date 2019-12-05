jest.mock('bcrypt');
const bcrypt = require('bcrypt');

const mockMethod = ({ name, value, type }) => bcrypt[name][type](value);

exports.successHash = value => mockMethod({ name: 'hash', value, type: 'mockResolvedValueOnce' });
exports.failHash = value => mockMethod({ name: 'hash', value, type: 'mockRejectedValueOnce' });
exports.successCompare = value => mockMethod({ name: 'compare', value, type: 'mockResolvedValueOnce' });
exports.failCompare = value => mockMethod({ name: 'compare', value, type: 'mockRejectedValueOnce' });
