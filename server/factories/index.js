const userFactory = require('./users');
const chatFactory = require('./chats');
const messagesFactory = require('./messages');

const factories = {
  user: userFactory,
  chat: chatFactory,
  message: messagesFactory,
};

module.exports = factories;
