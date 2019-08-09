require('dotenv').config();
const { expect } = require('chai');
const request = require('supertest');
const { factory } = require('factory-girl');
const { isValid, syncTestDatabase, truncateTables } = require('./testHelpers.utils');
require('../factories');

before(async () => {
  await syncTestDatabase();

  global.isValid = isValid;
  global.expect = expect;
  global.request = request;
  global.factory = factory;
  global.truncateTables = truncateTables;
});
