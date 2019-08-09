const httpStatus = require('http-status');
const models = require('../models');

module.exports = {
  send: async (req, res, next) => {
    try {
      const newMessage = await models.Message.create({ ...req.body, userId: req.user.id });
      const message = await models.Message.findByPk(newMessage.id, {
        include: [{
          model: models.User,
          attributes: ['id', 'username'],
        }],
      });

      return res.status(httpStatus.CREATED).json(message);
    } catch (err) {
      return next(err);
    }
  },
};
