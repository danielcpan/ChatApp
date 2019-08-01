const httpStatus = require('http-status');
const app = require('../../app');

describe('## Message APIs', () => {
  let message1;

  before(async () => {
    await truncateTables();
    message1 = await factory.create('Message');
  });

  describe('# GET /api/messages', () => {
    it('should get all messages', async () => {
      const response = await request(app).get('/api/messages');

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body).to.have.lengthOf(1);
    });
  });

  describe('# POST /api/messages', () => {
    it('should create new message', async () => {
      const chat1 = await factory.create('Chat');
      const user1 = await factory.create('User');
      const data = {
        text: 'Foobar',
        chatId: chat1.id,
        userId: user1.id,
        timestamp: new Date()
      };
      const response = await request(app).post('/api/messages').send(data);

      expect(response.status).to.equal(httpStatus.CREATED);
      expect(response.body.name).to.equal(data.name);
    });
  });
});
