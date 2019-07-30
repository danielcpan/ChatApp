const httpStatus = require('http-status');
const app = require('../../app');

describe('## Chat APIs', () => {
  let chat1;

  before(async () => {
    await truncateTables();
    chat1 = await factory.create('Chat');
  });

  describe('# GET /api/chats/:chatId', () => {
    it('should get chat details', async () => {
      const response = await request(app).get(`/api/chats/${chat1.id}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.name).to.equal(chat1.name);
    });
  });

  describe('# GET /api/chats', () => {
    it('should get all chats', async () => {
      const response = await request(app).get('/api/chats');

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body).to.have.lengthOf(1);
    });
  });

  describe('# POST /api/chats', () => {
    it('should create new chat', async () => {
      const user1 = await factory.create('User');
      const user2 = await factory.create('User');

      const data = {
        name: 'Foobar',
        usersIdList: [user1.id, user2.id],
      };
      const response = await request(app).post('/api/chats').send(data);

      expect(response.status).to.equal(httpStatus.CREATED);
      expect(response.body.name).to.equal(data.name);
    });
  });

  describe('# PUT /api/chats/:chatId', () => {
    it('should update a chat', async () => {
      const data = {
        name: `${chat1.name}foobar1`,
      };
      const response = await request(app).put(`/api/chats/${chat1.id}`).send(data);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.name).to.equal(data.name);
    });
  });

  describe('# DELETE /api/chats', () => {
    it('should delete a chat', async () => {
      const response = await request(app).delete(`/api/chats/${chat1.id}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.deleted).to.equal(true);
    });
  });
});
