const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const models = require('../models');
const APIError = require('../utils/APIError.utils');
const { JWT_SECRET } = require('../config/config');

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = await models.User.findOne({
        attributes: ['id', 'username', 'password', 'email'],
        where: { email: req.body.email.toLowerCase() },
      });

      // Check and catch sequelize instance errors
      let sequelizeInstanceErrors = null;
      await models.User.build({
        username: 'temp',
        email: req.body.email,
        password: req.body.password,
      }).validate().catch(err => sequelizeInstanceErrors = err); // eslint-disable-line no-return-assign, max-len

      if (sequelizeInstanceErrors) {
        return next(sequelizeInstanceErrors);
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
      const { email, username, password } = req.body
      const data = {
        email: email.toLowerCase(),
        username,
        password
      }
      const newUser = await models.User.create(data);

      const user = await models.User.findByPk(newUser.id, {
        attributes: ['id', 'username'],
      });

      if (!user) {
        return next(new APIError('User not found', httpStatus.NOT_FOUND));
      }

      return res.status(httpStatus.CREATED).json(user);
    } catch (err) {
      return next(err);
    }
  },
};
