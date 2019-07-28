const Sequelize = require('sequelize');
const models = require('../models');

module.exports.isValid = async (object) => {
  const modelInstance = await object;
  let errorsList = [];

  await modelInstance.validate().catch(Sequelize.ValidationError, (status) => {
    errorsList = status.errors;
  });

  // Console log detected validation errors
  // for (let error of errorsList) {
  //   console.log('\x1b[31m%s\x1b[0m', `Validation Error: ${error.message}`)
  // }

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
