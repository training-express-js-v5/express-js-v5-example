const requiredError = key => `${key} is required`;

exports.REQUIRED_NAME_ERROR = requiredError('Name');
exports.REQUIRED_LASTNAME_ERROR = requiredError('Last name');
exports.REQUIRED_EMAIL_ERROR = requiredError('Email');
exports.REQUIRED_PASSWORD_ERROR = requiredError('Password');
exports.REQUIRED_SCORE = requiredError('Score');
exports.INVALID_EMAIL_ERROR = 'Invalid email';
exports.INVALID_PASSWORD_ERROR = 'Invalid password';
exports.INVALID_PASSWORD_LENGTH_ERROR = 'Password should have at least 8 characters';
exports.AUTHENTICATION_ERROR_MSG = 'User no authenticated';
exports.INVALID_TOKEN_ERROR_MSG = 'Invalid token';
exports.TOKEN_EXPIRED_ERROR_MSG = 'Token expired';
exports.NUMBERS_API_ERROR = 'Error when trying to obtain data from numbers api';
exports.INVALID_SCORE_ERROR = 'Score must be 1 or -1';
exports.WEET_ID_ERROR_MSG = 'Weet id in params must be integer';
exports.WEET_NOT_FOUND_MSG = 'Weet related to provided value in params could not be found';
