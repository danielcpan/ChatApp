const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('Message', models.Message, (buildOptions = {}) => { // eslint-disable-line no-unused-vars
  const attrs = {
    text: () => faker.lorem.text(),
    chatId: factory.assoc('Chat', 'id'),
    userId: factory.assoc('User', 'id'),
  };
  return attrs;
});
    // createdAt: faker.date.recent(400)