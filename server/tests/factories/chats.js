const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('Chat', models.Chat, (buildOptions = {}) => { // eslint-disable-line no-unused-vars
  const attrs = {
    name: () => faker.random.word(),
  };
  return attrs;
});
