const httpStatus = require('http-status');
const models = require('../models');
const APIError = require('../utils/APIError.utils');
const Sequelize = require('sequelize');

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
      console.log("we got here")
      console.log(req.body)
      const newUser = await models.User.create(req.body)
      // .catch(Sequelize.ValidationError, status => {
      //   console.log(status.errors)
      //   // return res.status(httpStatus.UNAUTHORIZED).json(status.errors[0].message);
      //   return next(new APIError(status.errors[0].message, httpStatus.UNAUTHORIZED))

      // });
      // console.log("post catch seq")
      // console.log(newUser)
      return res.status(httpStatus.CREATED).json(newUser);
    } catch (err) {
      return next(err);
    }
  },
}