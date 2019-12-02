const faker = require('faker');

const user = () => ({
  name: faker.name.firstName(),
  password: '12345678Aa',
  email: faker.internet.email(),
  lastName: faker.name.lastName()
});

const weet = () => ({
  content: faker.lorem.sentence()
});

module.exports = {
  email: faker.internet.email,
  name: faker.name.firstName,
  lastName: faker.name.lastName,
  password: faker.internet.password,
  user,
  weet
};
