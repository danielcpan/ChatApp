const httpStatus = require('http-status');
const models = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const messages = await models.Message.findAll({
        include: [{
          model: models.User,
          attributes: ['id', 'username']
        }]
      });
      return res.json(messages);
    } catch (err) {
      return next(err);
    }
  },
  create: async (req, res, next) => {
    console.log(req.body)
    try {
      const newMessage = await models.Message.create(req.body);
      const message = await models.Message.findByPk(newMessage.id, {
        include: [{
          model: models.User,
          attributes: ['id', 'username']
        }]
      })
      
      return res.status(httpStatus.CREATED).json(message);
    } catch (err) {
      return next(err);
    }
  },
};
