const { create } = require('../factory/users');
const { successDecode } = require('../mocks/jwt');
const { user } = require('../helpers/faker');
const { mockSuccessRequest, mockFailedRequest } = require('../mocks/request');
const Weet = require('../../app/models').weets;
const User = require('../../app/models').users;
const { getResponse, truncateDatabase } = require('../helpers/app');

describe('Module controllers', () => {
  describe('POST weets', () => {
    describe('Successfully cases', () => {
      describe('Create weet successfully', () => {
        let newWeet = {};
        let response = {};
        beforeAll(async () => {
          successDecode({ email: 'fake@domain.com' });
          const { id } = await create({ ...user(), email: 'fake@domain.com' });
          await mockSuccessRequest('This is a random fact');
          response = await getResponse({
            endpoint: '/weets',
            method: 'post',
            header: { authorization: 'Bearer token' }
          });
          newWeet = await Weet.findOne({
            include: [{ model: User, as: 'user', where: { id } }]
          });
        });
        afterAll(() => truncateDatabase());
        it('The response status code must be 201', () => {
          expect(response.statusCode).toBe(201);
        });
        it('Content tweet must be "This is a random fact"', () => {
          expect(newWeet.content).toBe('This is a random fact');
        });
        it('The creator email must be "fake@domain.com"', () => {
          expect(newWeet.user.email).toBe('fake@domain.com');
        });
      });
    });
    describe('Failure cases', () => {
      describe('Failure because api numbers is down', () => {
        let response = {};
        let newWeet = {};
        beforeAll(async () => {
          successDecode({ email: 'fake@domain.com' });
          await create({ ...user(), email: 'fake@domain.com' });
          await mockFailedRequest({
            message: 'Numbers api is down',
            statusCode: 500
          });
          response = await getResponse({
            endpoint: '/weets',
            method: 'post',
            header: { authorization: 'Bearer token' }
          });
          newWeet = await Weet.findOne();
        });
        afterAll(() => truncateDatabase());
        it('The status code must be 500', () => {
          expect(response.statusCode).toBe(500);
        });
        it('Weet must not created', () => {
          expect(newWeet).toBeNull();
        });
        it('Internal code must be numbers_api_error', () => {
          expect(response.body.internal_code).toBe('numbers_api_error');
        });
        it('Message must be Error when trying to obtain data from numbers api', () => {
          expect(response.body.message).toBe('Error when trying to obtain data from numbers api');
        });
      });
      describe('Failure because token is missing', () => {
        let response = {};
        let newWeet = {};
        beforeAll(async () => {
          response = await getResponse({
            endpoint: '/weets',
            method: 'post'
          });
          newWeet = await Weet.findOne();
        });
        afterAll(() => truncateDatabase());
        it('The status code must be 401', () => {
          expect(response.statusCode).toBe(401);
        });
        it('Weet must not created', () => {
          expect(newWeet).toBeNull();
        });
        it('Internal code must be authentication_error', () => {
          expect(response.body.internal_code).toBe('authentication_error');
        });
        it('Message must be User no authenticated', () => {
          expect(response.body.message).toBe('User no authenticated');
        });
      });
      describe('Failure because token is wrong', () => {
        let response = {};
        let newWeet = {};
        beforeAll(async () => {
          successDecode({ email: 'fake@domain.com' });
          response = await getResponse({
            endpoint: '/weets',
            method: 'post',
            header: { authorization: 'Bearer token' }
          });
          newWeet = await Weet.findOne();
        });
        afterAll(() => truncateDatabase());
        it('The status code must be 401', () => {
          expect(response.statusCode).toBe(401);
        });
        it('Weet must not created', () => {
          expect(newWeet).toBeNull();
        });
        it('Internal code must be authentication_error', () => {
          expect(response.body.internal_code).toBe('authentication_error');
        });
        it('Message must be User no authenticated', () => {
          expect(response.body.message).toBe('User no authenticated');
        });
      });
    });
  });
});
