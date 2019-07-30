const httpStatus = require('http-status');
const models = require('../models');
const ApiError = require('../utils/APIError.utils')

module.exports = {
  get: async (req, res, next) => {
    try {
      const chat = await models.Chat.findByPk(req.params.chatId);
      if (!chat) {
        return next(new ApiError('Chat not found', httpStatus.NOT_FOUND));
      }
      return res.json(chat);
    } catch (err) {
      return next(err)
    }
  },
  list: async (req, res, next) => {
    try {
      const chats = await models.Chat.findAll();
      return res.json(chats);
    } catch (err) {
      return next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      const users = await models.User.findAll({ where: { id: [0,1313] }});
      if (users.length === 0) {
        return next(new ApiError('Users not found', httpStatus.NOT_FOUND));
      }
      const newChat = await models.Chat.create(req.body);
      await newChat.setUsers(users)

      return res.status(httpStatus.CREATED).json(newChat)
    } catch (err) {
      return next(err)
    }
  },
  update: async (req, res, next) => {
    try {
      const chat = await models.Chat.findByPk(req.params.chatId);
      if (!chat) {
        return next(new ApiError('Chat not found', httpStatus.NOT_FOUND));
      }
      await chat.update(req.body)
      return res.status(httpStatus.OK).json(chat)
    } catch (err) {
      next(err)
    }
  },
  delete: async (req, res, next) => {
    try {
      const chat = await models.Chat.findByPk(req.params.chatId);
      if (!chat) {
        return next(new ApiError('Chat not found', httpStatus.NOT_FOUND));
      }
      await chat.destroy();
      return res.status(httpStatus.OK).json({ deleted: true })
    } catch (err) {
      return next(err);
    }
  },

}