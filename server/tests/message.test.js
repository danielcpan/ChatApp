const httpStatus = require('http-status');
const app = require('../app');

describe('## Message APIs', () => {
  const validTestUserCredentials = {
    username: 'TestUser',
    email: 'testUser@gmail.com',
    password: 'password',
  };

  let testUser;
  let testUserToken;
  let message1;

  before(async () => {
    await truncateTables();
    testUser = await factory.create('User', validTestUserCredentials);

    const response = await request(app)
      .post('/api/auth/login')
      .send(validTestUserCredentials);

    testUserToken = response.body.token;

    message1 = await factory.create('Message', { userId: testUser.id });
  });

  describe('# POST /api/messages', () => {
    it('errors when not logged in', async () => {
      const chat1 = await factory.create('Chat');
      const user1 = await factory.create('User');
      const data = {
        text: 'Foobar',
        chatId: chat1.id,
        userId: user1.id,
        timestamp: new Date(),
      };
      const response = await request(app)
        .post('/api/messages/send')
        .send(data);

      expect(response.status).to.equal(httpStatus.UNAUTHORIZED);
    });

    it('should send new message', async () => {
      const chat1 = await factory.create('Chat');
      const user1 = await factory.create('User');
      const data = {
        text: 'Foobar',
        chatId: chat1.id,
        userId: user1.id,
        timestamp: new Date(),
      };
      const response = await request(app)
        .post('/api/messages/send')
        .set('Authorization', `Bearer ${testUserToken}`)
        .send(data);

      expect(response.status).to.equal(httpStatus.CREATED);
      expect(response.body.name).to.equal(data.name);
    });
  });
});
