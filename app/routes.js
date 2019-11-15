const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const schemaValidator = require('./middlewares/schemas_validator');
const { userSignUpSchema, userLogInSchema } = require('./schemas/users');
const { checkUser } = require('./middlewares/authentication');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidator(userSignUpSchema)], users.signUp);
  app.post('/users/login', [schemaValidator(userLogInSchema), checkUser], users.logIn);
};
