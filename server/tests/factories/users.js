const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('User', models.User, (buildOptions = {}) => { // eslint-disable-line no-unused-vars
  const attrs = {
    username: () => faker.internet.userName(),
    email: () => faker.internet.email(),
    password: () => faker.internet.password(),
  };
  return attrs;
});
