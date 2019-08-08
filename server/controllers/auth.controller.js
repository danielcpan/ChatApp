const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const httpStatus = require('http-status');
const models = require('../models');
const APIError = require('../utils/APIError.utils');
const { JWT_SECRET } = require('../config/config');

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        attributes: ['id', 'username', 'password'],
        where: { email: req.body.email },
      });

      // Check and catch sequelize instance errors
      let sequelizeInstanceErrors = null;
      await models.User.build({ 
        username: 'temp',
        email: req.body.email,
        password: req.body.password
      }).validate().catch(err => sequelizeInstanceErrors = err)

      if (sequelizeInstanceErrors) {
        return next(sequelizeInstanceErrors)
      }

      if (!user) {
        return next(new APIError('Email not found', httpStatus.NOT_FOUND));
      }

      if (!user.validPassword(req.body.password)) {
        return next(new APIError('Invalid or wrong password', httpStatus.UNAUTHORIZED));
      }

      const { password, ...userWithoutPass } = user.toJSON();
      const token = jwt.sign(userWithoutPass, JWT_SECRET, { expiresIn: '7d' });

      return res.status(httpStatus.OK).json({ token, user: userWithoutPass });
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
