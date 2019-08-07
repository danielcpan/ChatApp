const httpStatus = require('http-status');
const models = require('../models');
const APIError = require('../utils/APIError.utils');

module.exports = {
  login: async (req, res, next) => {
    try {
      // const newUser = await models.User.create(req.body);
      // return res.status(httpStatus.CREATED).json(newUser);
    } catch (err) {
      return next(err);
    }
  },
  register: async (req, res, next) => {
    try {
      const newUser = await models.User.create(req.body);
      return res.status(httpStatus.CREATED).json(newUser);
    } catch (err) {
      return next(err);
    }
  },
};
