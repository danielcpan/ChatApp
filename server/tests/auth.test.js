const httpStatus = require('http-status');
const app = require('../app');

describe('## Auth APIs', () => {
  before(async () => {
    await truncateTables();
  });

  describe('# POST /api/auth/register', () => {
    it('should register new user', async () => {
      const data = {
        username: 'Dpizzle',
        email: 'dp@gmail.com',
        password: 'password',
      };
      const response = await request(app).post('/api/auth/register').send(data);

      expect(response.status).to.equal(httpStatus.CREATED);
      expect(response.body.username).to.equal(data.username);
    });
  });

  describe('# POST /api/auth/login', () => {
    it('should login user', async () => {
      const data = {
        email: 'dp@gmail.com',
        password: 'password',
      };
      const response = await request(app).post('/api/auth/login').send(data);

      expect(response.status).to.equal(httpStatus.OK);
      expect(response.body).to.have.property('token');
    });
  });
});
