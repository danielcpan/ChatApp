const httpStatus = require('http-status');
const models = require('../models');
const APIError = require('../utils/APIError.utils');

module.exports = {
  get: async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.params.userId);
      if (!user) {
        return next(new APIError('User not found', httpStatus.NOT_FOUND));
      }
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
  list: async (req, res, next) => {
    try {
      const users = await models.User.findAll({
        attributes: ['id', 'username']
      });
      return res.json(users);
    } catch (err) {
      return next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.params.userId);
      if (!user) {
        return next(new APIError('User not found', httpStatus.NOT_FOUND));
      }
      await user.update(req.body);
      return res.status(httpStatus.OK).json(user);
    } catch (err) {
      return next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.params.userId);
      if (!user) {
        return next(new APIError('User not found', httpStatus.NOT_FOUND));
      }
      await user.destroy();
      return res.status(httpStatus.OK).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  },
};
