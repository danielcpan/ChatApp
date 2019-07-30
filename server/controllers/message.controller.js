const httpStatus = require('http-status');
const models = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const messages = await models.Message.findAll();
      return res.json(messages);
    } catch (err) {
      return next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      const newMessage = await models.Message.create(req.body);
      return res.status(httpStatus.CREATED).json(newMessage)
    } catch (err) {
      return next(err)
    }
  },
}