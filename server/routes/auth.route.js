const express = require('express');
const expressJwt = require('express-jwt')
const authController = require('../controllers/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

module.exports = router;
