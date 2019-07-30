/* eslint-disable no-unused-vars */

const { factory } = require('factory-girl');
require('../tests/factories');

module.exports.createTestData = async () => {
  const user1 = await factory.create('User');
  const user2 = await factory.create('User');
  const user3 = await factory.create('User');
  const user4 = await factory.create('User');
  const user5 = await factory.create('User');

  const chat1 = await factory.create('Chat', { name: 'user1AndUser2Chat' }, { users: [user1, user2] })
  const chat2 = await factory.create('Chat', { name: 'user1AndUser3Chat' }, { users: [user1, user3] })
  const chat3 = await factory.create('Chat', { name: 'user1AndUser4Chat' }, { users: [user1, user4] })
  const chat4 = await factory.create('Chat', { name: 'user1AndUser5Chat' }, { users: [user1, user5] })

  const messages1User1 = await factory.createMany('Message', 5, { chatId: chat1.id, userId: user1.id })
  const messages1User2 = await factory.createMany('Message', 5, { chatId: chat1.id, userId: user2.id })

  const messages2User1 = await factory.createMany('Message', 5, { chatId: chat2.id, userId: user1.id })
  const messages2User2 = await factory.createMany('Message', 5, { chatId: chat2.id, userId: user3.id })
  
  const messages3User1 = await factory.createMany('Message', 5, { chatId: chat3.id, userId: user1.id })
  const messages3User2 = await factory.createMany('Message', 5, { chatId: chat3.id, userId: user4.id })

  const messages4User1 = await factory.createMany('Message', 5, { chatId: chat4.id, userId: user1.id })
  const messages4User2 = await factory.createMany('Message', 5, { chatId: chat4.id, userId: user5.id })
};

