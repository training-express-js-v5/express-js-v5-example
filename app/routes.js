const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const weets = require('./controllers/weets');
const schemaValidator = require('./middlewares/schemas_validator');
const { userSignUpSchema, userLogInSchema } = require('./schemas/users');
const { checkToken } = require('./middlewares/authentication');
const { paginationSchema } = require('./schemas/pagination');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidator(userSignUpSchema)], users.signUp);
  app.post('/users/login', [schemaValidator(userLogInSchema)], users.logIn);
  app.post('/weets', checkToken, weets.create);
  app.get('/weets', [checkToken, schemaValidator(paginationSchema)], weets.getAll);
};
