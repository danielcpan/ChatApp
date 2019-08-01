/* eslint-disable no-unused-vars */

const { factory } = require('factory-girl');
const faker = require('faker/locale/en');
require('../tests/factories');

module.exports.createTestData = async () => {
  const user1 = await factory.create('User');
  const user2 = await factory.create('User');
  const user3 = await factory.create('User');
  const user4 = await factory.create('User');
  const user5 = await factory.create('User');
  const user6 = await factory.create('User');
  const user7 = await factory.create('User');
  const user8 = await factory.create('User');
  const user9 = await factory.create('User');
  const user10 = await factory.create('User');
  const user11 = await factory.create('User');
  const user12 = await factory.create('User');
  const user13 = await factory.create('User');
  const user14 = await factory.create('User');
  const user15 = await factory.create('User');

  const chat1 = await factory.create('Chat', { name: 'user1AndUser2Chat' }, { users: [user1, user2] })
  const chat2 = await factory.create('Chat', { name: 'user1AndUser3Chat' }, { users: [user1, user3] })
  const chat3 = await factory.create('Chat', { name: 'user1AndUser4Chat' }, { users: [user1, user4] })
  const chat4 = await factory.create('Chat', { name: 'user1AndUser5Chat' }, { users: [user1, user5] })
  const chat5 = await factory.create('Chat', { name: 'user1AndUser6Chat' }, { users: [user1, user6] })
  const chat6 = await factory.create('Chat', { name: 'user1AndUser7Chat' }, { users: [user1, user7] })
  const chat7 = await factory.create('Chat', { name: 'user1AndUser8Chat' }, { users: [user1, user8] })
  const chat8 = await factory.create('Chat', { name: 'user1AndUser9Chat' }, { users: [user1, user9] })
  const chat9 = await factory.create('Chat', { name: 'user1AndUser10Chat' }, { users: [user1, user10] })
  const chat10 = await factory.create('Chat', { name: 'user1AndUser11Chat' }, { users: [user1, user11] })
  const chat11 = await factory.create('Chat', { name: 'user1AndUser12Chat' }, { users: [user1, user12] })
  const chat12 = await factory.create('Chat', { name: 'user1AndUser13Chat' }, { users: [user1, user13] })    
  const chat13 = await factory.create('Chat', { name: 'user1AndUser14Chat' }, { users: [user1, user14] })    
  const chat14 = await factory.create('Chat', { name: 'user1AndUser15Chat' }, { users: [user1, user15] })

  const messages1User1 = await factory.createMany('Message', 5, { chatId: chat1.id, userId: user1.id})
  const messages1User2 = await factory.createMany('Message', 5, { chatId: chat1.id, userId: user2.id})

  const messages2User1 = await factory.createMany('Message', 5, { chatId: chat2.id, userId: user1.id})
  const messages2User3 = await factory.createMany('Message', 5, { chatId: chat2.id, userId: user3.id})
  
  const messages3User1 = await factory.createMany('Message', 5, { chatId: chat3.id, userId: user1.id})
  const messages3User4 = await factory.createMany('Message', 5, { chatId: chat3.id, userId: user4.id})

  const messages4User1 = await factory.createMany('Message', 5, { chatId: chat4.id, userId: user1.id})
  const messages4User5 = await factory.createMany('Message', 5, { chatId: chat4.id, userId: user5.id})

  const messages5User1 = await factory.createMany('Message', 5, { chatId: chat5.id, userId: user1.id})
  const messages5User6 = await factory.createMany('Message', 5, { chatId: chat5.id, userId: user6.id})

  const messages6User1 = await factory.createMany('Message', 5, { chatId: chat6.id, userId: user1.id})
  const messages6User7 = await factory.createMany('Message', 5, { chatId: chat6.id, userId: user7.id})
  
  const messages7User1 = await factory.createMany('Message', 5, { chatId: chat7.id, userId: user1.id})
  const messages7User8 = await factory.createMany('Message', 5, { chatId: chat7.id, userId: user8.id})

  const messages8User1 = await factory.createMany('Message', 5, { chatId: chat8.id, userId: user1.id})
  const messages8User9 = await factory.createMany('Message', 5, { chatId: chat8.id, userId: user9.id})
  
  const messages9User1 = await factory.createMany('Message', 5, { chatId: chat9.id, userId: user1.id})
  const messages9User10 = await factory.createMany('Message', 5, { chatId: chat9.id, userId: user10.id})

  const messages10User1 = await factory.createMany('Message', 5, { chatId: chat10.id, userId: user1.id})
  const messages10User11 = await factory.createMany('Message', 5, { chatId: chat10.id, userId: user11.id})
  
  const messages11User1 = await factory.createMany('Message', 5, { chatId: chat11.id, userId: user1.id})
  const messages11User12 = await factory.createMany('Message', 5, { chatId: chat11.id, userId: user12.id})

  const messages12User1 = await factory.createMany('Message', 5, { chatId: chat12.id, userId: user1.id})
  const messages12User13 = await factory.createMany('Message', 5, { chatId: chat12.id, userId: user13.id})
  
  const messages13User1 = await factory.createMany('Message', 5, { chatId: chat13.id, userId: user1.id})
  const messages13User14 = await factory.createMany('Message', 5, { chatId: chat13.id, userId: user14.id})

  // const messages14User1 = await factory.createMany('Message', 5, { chatId: chat14.id, userId: user1.id})
  // const messages14User15 = await factory.createMany('Message', 5, { chatId: chat14.id, userId: user15.id})  
};

