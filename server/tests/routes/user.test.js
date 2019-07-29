const app = require('../../app');

describe('## User APIs', () => {

  describe('# GET /api/users/:userId', () => {
    it('should get user details', async () => {
      // const response = await request(app).get('/api/users/1')
      // console.log(response)
      // expect(response.status).to.equal(200);
    });
  });

  describe('# GET /api/users', () => {
    it('should get all users', async () => {
      const response = await request(app).get('/api/users')
      expect(response.status).to.equal(200);
    });
  });

  describe('# POST /api/users', () => {
    it('should create new user', async () => {
      // const response = await request(app).post('/api/users')
      // expect(response.status).to.equal(200);      
    });
  });

  describe('# PUT /api/users/:userId', () => {
    it('should update a user', async () => {
      
    });
  });
  
  describe('# DELETE /api/users', () => {
    it('should delete a user', async () => {
      
    });
  });

});
