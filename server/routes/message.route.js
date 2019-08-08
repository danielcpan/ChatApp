const express = require('express');
const expressJwt = require('express-jwt')
const messageController = require('../controllers/message.controller');
const { JWT_SECRET } = require('../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(messageController.list);

router.route('/send')
  .post(expressJwt({ secret: JWT_SECRET }), messageController.send);

module.exports = router;
