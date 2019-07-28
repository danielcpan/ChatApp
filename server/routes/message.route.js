const express = require('express')
const messageController = require('../controllers/message.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(messageController.list)
  .post(messageController.create);

module.exports = router;