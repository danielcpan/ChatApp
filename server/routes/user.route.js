const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(userController.list)

router.route('/:userId')
  .get(userController.get)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
