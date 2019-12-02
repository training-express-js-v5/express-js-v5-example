const { user: getFakeUser, email, name, lastName, password } = require('../helpers/faker');
const { successHash, failHash, successCompare, failCompare } = require('../mocks/bcrypt');
const User = require('../../app/models').users;
const { getResponse, truncateDatabase } = require('../helpers/app');
const { create } = require('../factory/users');
const { successSignIn } = require('../mocks/jwt');

describe('Users controllers', () => {
  beforeAll(() => truncateDatabase());
  describe('POST users', () => {
    describe('Successful cases', () => {
      describe('Create user successfully', () => {
        let response = {};
        let newUser = {};
        const user = getFakeUser();
        beforeAll(async () => {
          successHash('I am a password encrypted');
          response = await getResponse({
            endpoint: '/users',
            method: 'post',
            body: { ...user, email: 'fake@domain.com' }
          });
          newUser = await User.findOne();
        });
        afterAll(() => truncateDatabase());
        it('The response status code must be 201', () => {
          expect(response.statusCode).toBe(201);
        });
        it('The response body must contain user data', () => {
          expect(response.body).toMatchObject({ name: newUser.name, lastName: newUser.lastName });
        });
        it('The user created must contain password encrypted', () => {
          expect(newUser.password).toBe('I am a password encrypted');
        });
      });
      describe('Failure cases', () => {
        describe.each([
          { email: email(), password: password(), name: name() },
          { lastName: lastName(), email: email(), password: password() },
          { name: name(), lastName: lastName(), email: email() },
          { password: password(), name: name(), lastName: lastName() },
          {}
        ])('Failure for Invalid body schema sent in the request: %p', body => {
          let error = {};
          beforeAll(async () => {
            error = await getResponse({
              body,
              endpoint: '/users',
              method: 'post'
            });
          });
          it('The error must be schema error', () => {
            expect(error.body.internal_code).toBe('schema_error');
          });
          it('The statusCode must be 422', () => {
            expect(error.statusCode).toBe(422);
          });
        });
        describe('Failure because bcrypt is down', () => {
          let response = {};
          const user = getFakeUser();
          beforeAll(async () => {
            failHash('I am down');
            response = await getResponse({
              endpoint: '/users',
              method: 'post',
              body: { ...user, email: 'fake@domain.com' }
            });
          });
          it('The response status code must be 500', () => {
            expect(response.statusCode).toBe(500);
          });
          it('The response body message must be "Error hashing password"', () => {
            expect(response.body.message).toBe('Error hashing password');
          });
          it('The response body internalCode must be "hash_error"', () => {
            expect(response.body.internal_code).toBe('hash_error');
          });
        });
      });
    });
  });
  describe(' POST users/login', () => {
    describe('Successful cases', () => {
      describe('Login successful', () => {
        let response = {};
        const user = getFakeUser();
        beforeAll(async () => {
          await create({ ...user, email: 'fake@domain.com' });
          successSignIn('I am a token');
          successCompare(true);
          response = await getResponse({
            endpoint: '/users/login',
            method: 'post',
            body: { email: 'fake@domain.com', password: user.password }
          });
        });
        afterAll(() => truncateDatabase());
        it('The response status code must be 200', () => {
          expect(response.statusCode).toBe(200);
        });
        it('The response body must contain token', () => {
          expect(response.body.token).toBe('I am a token');
        });
      });
    });
    describe('Failure cases', () => {
      describe.each([{ email: email() }, { password: password() }, {}])(
        'Failure for Invalid body schema sent in the request: %p',
        body => {
          let error = {};
          beforeAll(async () => {
            error = await getResponse({
              body,
              endpoint: '/users/login',
              method: 'post'
            });
          });
          it('The error must be schema error', () => {
            expect(error.body.internal_code).toBe('schema_error');
          });
          it('The statusCode must be 422', () => {
            expect(error.statusCode).toBe(422);
          });
        }
      );
      describe('Failure for invalid password', () => {
        let error = {};
        const user = getFakeUser();
        beforeAll(async () => {
          await create({ ...user, email: 'fake@domain.com' });
          successCompare(false);
          error = await getResponse({
            endpoint: '/users/login',
            method: 'post',
            body: { email: 'fake@domain.com', password: user.password }
          });
        });
        afterAll(() => truncateDatabase());
        it('The statusCode must be 401', () => {
          expect(error.statusCode).toBe(401);
        });
        it('The body internal_code must be "user_sign_in_error"', () => {
          expect(error.body.internal_code).toBe('user_sign_in_error');
        });
        it('The body message must be "Username or password invalid"', () => {
          expect(error.body.message).toBe('Username or password invalid');
        });
      });
      describe('Failure because bcrypt is down', () => {
        let error = {};
        const user = getFakeUser();
        beforeAll(async () => {
          await create({ ...user, email: 'fake@domain.com' });
          failCompare('I am down');
          error = await getResponse({
            endpoint: '/users/login',
            method: 'post',
            body: { email: 'fake@domain.com', password: user.password }
          });
        });
        afterAll(() => truncateDatabase());
        it('The statusCode must be 500', () => {
          expect(error.statusCode).toBe(500);
        });
        it('The body internal_code must be "hash_error"', () => {
          expect(error.body.internal_code).toBe('hash_error');
        });
        it('The body message must be "Error comparing passwords"', () => {
          expect(error.body.message).toBe('Error comparing passwords');
        });
      });
    });
  });
});
