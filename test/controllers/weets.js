const { create } = require('../factory/users');
const { successDecode } = require('../mocks/jwt');
const { user } = require('../helpers/faker');
const { mockSuccessRequest } = require('../mocks/request');
const Weet = require('../../app/models').weets;
const { getResponse } = require('../helpers/app');

describe('Module controllers', () => {
  describe('POST weets', () => {
    describe('Successfully cases', () => {
      describe('Create weet successfully', () => {
        let newWeet = {};
        let response = {};
        beforeAll(async () => {
          successDecode({ email: 'fake@domain.com' });
          await mockSuccessRequest('This is a random fact');
          await create({ ...user(), email: 'fake@domain.com' });
          response = await getResponse({
            endpoint: '/weets',
            method: 'post',
            header: { authorization: 'Bearer token' }
          });
          newWeet = await Weet.findOne({
            where: { content: 'This is a random fact' }
          });
        });
        it('The response status code must be 201', () => {
          expect(response.statusCode).toBe(201);
        });
        it('Content tweet must be "This is a random fact"', () => {
          expect(newWeet.content).toBe('This is a random fact');
        });
        it('The creator email must be "fake@domain.com"', () => {
          expect(newWeet.userCreator.email).toBe('fake@domain.com');
        });
      });
    });
  });
});
