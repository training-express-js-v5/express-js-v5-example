const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const weets = require('./controllers/weets');
const ratings = require('./controllers/ratings');
const schemaValidator = require('./middlewares/schemas_validator');
const { userSignUpSchema, userLogInSchema } = require('./schemas/users');
const { paginationSchema } = require('./schemas/pagination');
const { ratingSchema } = require('./schemas/ratings');
const { checkUser, authenticate, checkWeet } = require('./middlewares/authentication');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidator(userSignUpSchema)], users.signUp);
  app.post('/users/login', [schemaValidator(userLogInSchema), checkUser], users.logIn);
  app.post('/weets', authenticate, weets.create);
  app.get('/weets', [authenticate, schemaValidator(paginationSchema)], weets.getAll);
  app.post(
    '/weets/:weetId/ratings',
    [authenticate, schemaValidator(ratingSchema), checkWeet],
    ratings.create
  );
};
