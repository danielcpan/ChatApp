const httpStatus = require('http-status');
const app = require('../app');

describe('## Chat APIs', () => {
  const validTestUserCredentials = {
    username: 'TestUser',
    email: 'testUser@gmail.com',
    password: 'password',
  };

  let testUser;
  let testUserToken;
  let user2;
  let chat1;

  before(async () => {
    await truncateTables();
    testUser = await factory.create('User', validTestUserCredentials);
    user2 = await factory.create('User');

    const response = await request(app)
      .post('/api/auth/login')
      .send(validTestUserCredentials);

    testUserToken = response.body.token;

    chat1 = await factory.create('Chat', {}, { users: [testUser, user2] });
  });

  describe('# GET /api/chats/:chatId', () => {
    it('errors when not logged in', async () => {
      const response = await request(app)
        .get(`/api/chats/${chat1.id}`);

      expect(response.status).to.equal(httpStatus.UNAUTHORIZED);
    });

    it('should get chat details', async () => {
      const response = await request(app)
        .get(`/api/chats/${chat1.id}`)
        .set('Authorization', `Bearer ${testUserToken}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.name).to.equal(chat1.name);
    });
  });

  describe('# GET /api/chats', () => {
    it('errors when not logged in', async () => {
      const response = await request(app)
        .get('/api/chats');

      expect(response.status).to.equal(httpStatus.UNAUTHORIZED);
    });

    it('should get all chats', async () => {
      const response = await request(app)
        .get('/api/chats')
        .set('Authorization', `Bearer ${testUserToken}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body).to.have.lengthOf(1);
    });
  });

  describe('# POST /api/chats', () => {
    it('errors when not logged in', async () => {
      const user = await factory.create('User');

      const data = {
        usersIdList: [testUser.id, user.id],
      };
      const response = await request(app)
        .post('/api/chats')
        .send(data);

      expect(response.status).to.equal(httpStatus.UNAUTHORIZED);
    });

    it('should create new chat', async () => {
      const user = await factory.create('User');

      const data = {
        usersIdList: [testUser.id, user.id],
      };
      const response = await request(app)
        .post('/api/chats')
        .set('Authorization', `Bearer ${testUserToken}`)
        .send(data);

      expect(response.status).to.equal(httpStatus.CREATED);
      expect(response.body.name).to.equal(`${testUser.username}, ${user.username}`);
    });
  });

  describe('# PUT /api/chats/:chatId', () => {
    it('errors when not logged in', async () => {
      const data = {
        name: `${chat1.name}foobar1`,
      };
      const response = await request(app)
        .put(`/api/chats/${chat1.id}`)
        .send(data);

      expect(response.status).to.equal(httpStatus.UNAUTHORIZED);
    });

    it('should update a chat', async () => {
      const data = {
        name: `${chat1.name}foobar1`,
      };
      const response = await request(app)
        .put(`/api/chats/${chat1.id}`)
        .set('Authorization', `Bearer ${testUserToken}`)
        .send(data);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.name).to.equal(data.name);
    });
  });

  describe('# DELETE /api/chats', () => {
    it('errors when not logged in', async () => {
      const response = await request(app)
        .delete(`/api/chats/${chat1.id}`);

      expect(response.status).to.equal(httpStatus.UNAUTHORIZED);
    });

    it('should delete a chat', async () => {
      const response = await request(app)
        .delete(`/api/chats/${chat1.id}`)
        .set('Authorization', `Bearer ${testUserToken}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.deleted).to.equal(true);
    });
  });
});
