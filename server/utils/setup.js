const { expect } = require('chai');
// const { factory } = require('factory-girl');
const { isValid, syncTestDatabase, truncateTables } = require('./testHelpers');

// Set Up Global Variables
global.isValid = isValid;
global.expect = expect;
// global.factory = factory;
global.truncateTables = truncateTables;
// require('../factories');

// Sync the database models
before(async () => {
  await syncTestDatabase();
});
