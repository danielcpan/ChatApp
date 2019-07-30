/* eslint-disable no-unused-vars */

const { factory } = require('factory-girl');
require('../tests/factories');

module.exports.createTestData = async () => {
  const user1 = await factory.create('User');
  const user2 = await factory.create('User');
  const user3 = await factory.create('User');
  const user4 = await factory.create('User');
  const user5 = await factory.create('User');

  const user1AndUser2Chat = await factory.create('Chat', { name: 'user1AndUser2Chat' }, { users: [user1, user2] })
  const user1AndUser3Chat = await factory.create('Chat', { name: 'user1AndUser3Chat' }, { users: [user1, user3] })
  const user1AndUser4Chat = await factory.create('Chat', { name: 'user1AndUser4Chat' }, { users: [user1, user4] })
  const user1AndUser5Chat = await factory.create('Chat', { name: 'user1AndUser5Chat' }, { users: [user1, user5] })
};

