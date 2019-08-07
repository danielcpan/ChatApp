const Sequelize = require('sequelize');
const models = require('../models');

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
