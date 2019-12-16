const { successHash, failHash } = require('../mocks/bcrypt');
const User = require('../../app/models').users;
const { getResponse, truncateDatabase } = require('../helpers/app');
const { build } = require('../factory/users');
const { mockSuccessRequest, mockFailedRequest } = require('../mocks/request');

describe('Users controllers', () => {
  beforeAll(() => truncateDatabase());
  describe('POST users', () => {
    let user = {};
    beforeAll(async () => {
      user = await build({ password: '12345678Aa' });
    });
    describe('Successful cases', () => {
      describe('Create user successfully', () => {
        let response = {};
        let newUser = {};
        beforeAll(async () => {
          successHash('I am a password encrypted');
          response = await getResponse({
            endpoint: '/users',
            method: 'post',
            body: { ...user.dataValues, email: 'fake@domain.com' }
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
    });
    describe('Failure cases users', () => {
      const { email, lastName, password, name } = user;
      describe.each([
        { email, password, name },
        { lastName, email, password },
        { name, lastName, email },
        { password, name, lastName },
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
        beforeAll(async () => {
          failHash('I am down');
          response = await getResponse({
            endpoint: '/users',
            method: 'post',
            body: { ...user.dataValues, email: 'fake@domain.com' }
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

  describe(' POST users/login', () => {
    describe('Successful cases', () => {
      describe('Login successful', () => {
        let response = {};
        beforeAll(async () => {
          mockSuccessRequest({
            id_token: 'id token',
            refresh_token: 'refresh token',
            token_type: 'Bearer',
            access_token: 'access token'
          });
          response = await getResponse({
            endpoint: '/users/login',
            method: 'post',
            body: { code: 'fake code' }
          });
        });
        afterAll(() => truncateDatabase());
        it('The response status code must be 200', () => {
          expect(response.statusCode).toBe(200);
        });
        it('The response body id_token must be valid', () => {
          expect(response.body.id_token).toBe('id token');
        });
        it('The response body refresh_token must be valid', () => {
          expect(response.body.refresh_token).toBe('refresh token');
        });
        it('The response body access_token must be valid', () => {
          expect(response.body.access_token).toBe('access token');
        });
        it('The response body token_type must be Bearer', () => {
          expect(response.body.token_type).toBe('Bearer');
        });
      });
    });
    describe('Failure cases', () => {
      describe('Failure for invalid body schema in the request', () => {
        let error = {};
        beforeAll(async () => {
          error = await getResponse({
            body: {},
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
      });
      describe.only('Failure for invalid code', () => {
        let error = {};
        beforeAll(async () => {
          mockFailedRequest({
            error: { error: 'invalid_grant', errorDescription: 'Invalid authorization code' },
            statusCode: 403
          });
          error = await getResponse({
            endpoint: '/users/login',
            method: 'post',
            body: { code: 'fake code' }
          });
        });
        it('The statusCode must be 422', () => {
          expect(error.statusCode).toBe(422);
        });
        it('The body internal_code must be "auth0_invalid_code"', () => {
          expect(error.body.internal_code).toBe('auth0_invalid_code');
        });
        it('The body message must be "The code is not valid"', () => {
          expect(error.body.message).toBe('The code is not valid');
        });
      });
      describe('Failure because auht0 is down', () => {
        let error = {};
        beforeAll(async () => {
          mockFailedRequest({
            error: { errorDescription: 'I am down', error: 'internal_server_error' },
            statusCode: 500
          });
          error = await getResponse({
            endpoint: '/users/login',
            method: 'post',
            body: { code: 'fake code' }
          });
        });
        it('The statusCode must be 500', () => {
          expect(error.statusCode).toBe(500);
        });
        it('The body internal_code must be "hash_error"', () => {
          expect(error.body.internal_code).toBe('auth0_sign_in_error');
        });
        it('The body message must be "Error comparing passwords"', () => {
          expect(error.body.message).toBe('Error login user');
        });
      });
    });
  });
});
