const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.USER_SIGNUP_ERROR = 'user_signup_error';
exports.userSignupError = message => internalError(message, exports.USER_SIGNUP_ERROR);

exports.HASH_ERROR = 'hash_error';
exports.hashError = message => internalError(message, exports.HASH_ERROR);

exports.SCHEMA_ERROR = 'schema_error';
exports.schemaError = message => internalError(message, exports.SCHEMA_ERROR);

exports.LOGIN_ERROR = 'user_sign_in_error';
exports.loginError = message => internalError(message, exports.LOGIN_ERROR);

exports.AUTHENTICATION_ERROR = 'authentication_error';
exports.authenticationError = message => internalError(message, exports.AUTHENTICATION_ERROR);

exports.NUMBERS_API_ERROR = 'numbers_api_error';
exports.numbersApiError = message => internalError(message, exports.NUMBERS_API_ERROR);

exports.WEET_NOT_FOUND = 'weet_not_found';
exports.weetNotFound = message => internalError(message, exports.WEET_NOT_FOUND);

exports.TRANSACTION_ERROR = 'transaction_error';
exports.transactionError = message => internalError(message, exports.TRANSACTION_ERROR);
