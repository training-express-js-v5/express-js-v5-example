const user = require('./user');
const weet = require('./weet');

module.exports = { ...user, ...weet };
