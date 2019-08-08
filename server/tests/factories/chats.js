const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
const models = require('../../models');

module.exports = factory.define('Chat', models.Chat, (buildOptions = {}) => { // eslint-disable-line no-unused-vars
  const attrs = {
    name: () => faker.random.word(),
  };
  return attrs;
}, {
  afterCreate: async (model, attrs, buildOptions) => {
    let { users } = buildOptions || {};
    
    if (!users) {
      const user1 = await factory.create('User');
      const user2 = await factory.create('User');
      users = [user1, user2];
    }

    await model.setUsers(users);

    return model;
  },
});
