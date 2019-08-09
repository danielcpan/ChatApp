const Sequelize = require('sequelize');
const { factory } = require('factory-girl');
const models = require('../models');
const app = require('../app');
require('../tests/factories');

module.exports.isValid = async (object) => {
  const modelInstance = await object;
  let errorsList = [];

  await modelInstance.validate().catch(Sequelize.ValidationError, (status) => {
    errorsList = status.errors;
  });

  return !errorsList.length;
};

module.exports.truncateTables = async () => Promise.all(
  Object.keys(models).map((modelName) => {
    if (['sequelize', 'Sequelize'].includes(modelName)) return null;
    return models[modelName].destroy({ truncate: { cascade: true } });
  }),
);

module.exports.syncTestDatabase = async () => {
  await models.sequelize.sync({
    force: true,
  });
};

module.exports.buildTestUserToken = async () => {
  const data = {
    username: 'TestUser',
    email: 'testUser@gmail.com',
    password: 'password',
  };

  await factory.create('User', data);
  const response = await request(app).post('/api/auth/login')
    .send({ email: data.email, password: data.password });

  return response.body.token;
};
