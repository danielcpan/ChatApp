const { expect } = require('chai');
const request = require('supertest');
const { factory } = require('factory-girl');
const { isValid, syncTestDatabase, truncateTables } = require('./testHelpers');

// Set Up Global Variables
global.isValid = isValid;
global.expect = expect;
global.request = request;
global.factory = factory;
global.truncateTables = truncateTables;
require('../tests/factories');

// Sync the database models
before(async () => {
  await syncTestDatabase();
});
