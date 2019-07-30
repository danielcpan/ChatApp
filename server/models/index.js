const Sequelize = require('sequelize');

// Models
const User = require('./user.model');
const Chat = require('./chat.model');
const Message = require('./message.model');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config`)[env]; // eslint-disable-line import/no-dynamic-require

let sequelize = null;

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  // the application is executed on the local machine
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
  User: User.init(sequelize, Sequelize),
  Chat: Chat.init(sequelize, Sequelize),
  Message: Message.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
