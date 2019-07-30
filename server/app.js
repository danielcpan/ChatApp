/* eslint no-console: 0 */
require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('../server/routes/index.route');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force close connection, sometimes it persists
// db.sequelize.close()

// if (process.env.NODE_ENV === 'development') {
// Sync the database models
// const models = require('./models');
// models.sequelize.sync({
//   force: true,
// });

// const { createTestData } = require('./seeders/testData');
// createTestData()

app.use('/api', routes);


module.exports = app;
