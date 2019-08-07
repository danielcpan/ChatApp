const express = require('express');
const messageController = require('../controllers/message.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(messageController.list);

router.route('/send')
  .post(messageController.send);

module.exports = router;
