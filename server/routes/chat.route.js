const express = require('express');
const expressJwt = require('express-jwt')
const chatController = require('../controllers/chat.controller');
const { JWT_SECRET } = require('../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(expressJwt({ secret: JWT_SECRET }), chatController.list)
  // .get(chatController.list)
  // .post(chatController.create);
  .post(expressJwt({ secret: JWT_SECRET }), chatController.create);

router.route('/:chatId')
  .get(expressJwt({ secret: JWT_SECRET }), chatController.get)
  // .get(chatController.get)
  .put(chatController.update)
  .delete(chatController.delete);

module.exports = router;
