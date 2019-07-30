const express = require('express');
const chatController = require('../controllers/chat.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(chatController.list)
  .post(chatController.create);

router.route('/:chatId')
  .get(chatController.get)
  .put(chatController.update)
  .delete(chatController.delete);

module.exports = router;
