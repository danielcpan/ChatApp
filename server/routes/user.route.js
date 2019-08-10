const express = require('express');
const expressJwt = require('express-jwt');
const userController = require('../controllers/user.controller');
const { JWT_SECRET } = require('../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(expressJwt({ secret: JWT_SECRET }), userController.list);

router.route('/:userId')
  .get(userController.get)
  .put(userController.update);

module.exports = router;
