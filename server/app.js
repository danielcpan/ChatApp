/* eslint no-console: 0 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('../server/routes/index.route');
const models = require('./models');

const app = express();

// Middleware
app.use(cors());

// Force close connection, sometimes it persists
// db.sequelize.close()

// if (process.env.NODE_ENV === 'development') {
// Sync the database models
models.sequelize.sync({
  force: true,
});
// }

app.use('/api', routes);


module.exports = app;
