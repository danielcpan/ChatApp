const httpStatus = require('http-status');
const app = require('../../app');

describe('## User APIs', () => {
  let user1;

  before(async () => {
    await truncateTables();
    user1 = await factory.create('User');
  });

  describe('# GET /api/users/:userId', () => {
    it('should get user details', async () => {
      const response = await request(app).get(`/api/users/${user1.id}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.username).to.equal(user1.username);
    });
  });

  describe('# GET /api/users', () => {
    it('should get all users', async () => {
      const response = await request(app).get('/api/users');

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body).to.have.lengthOf(1);
    });
  });

  describe('# PUT /api/users/:userId', () => {
    it('should update a user', async () => {
      const data = {
        username: `${user1.username}foobar`,
      };
      const response = await request(app).put(`/api/users/${user1.id}`).send(data);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.username).to.equal(data.username);
    });
  });

  describe('# DELETE /api/users', () => {
    it('should delete a user', async () => {
      const response = await request(app).delete(`/api/users/${user1.id}`);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body.deleted).to.equal(true);
    });
  });
});
