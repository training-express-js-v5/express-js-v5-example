const faker = require('faker');

exports.user = () => ({
  name: faker.name.firstName,
  password: faker.internet.password,
  email: faker.internet.email,
  lastName: faker.name.lastName
});

exports.weet = () => ({
  content: faker.lorem.sentence()
});
