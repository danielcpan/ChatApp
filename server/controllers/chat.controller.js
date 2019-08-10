const httpStatus = require('http-status');
const models = require('../models');
const APIError = require('../utils/APIError.utils');

module.exports = {
  get: async (req, res, next) => {
    try {
      const chat = await models.Chat.findByPk(req.params.chatId, {
        attributes: ['id', 'name'],
        include: [
          {
            model: models.Message,
            attributes: ['id', 'userId', 'text', 'timestamp'],
            include: [{
              model: models.User,
              attributes: ['id', 'username'],
            }],
          },
        ],
        order: [[models.Message, 'timestamp', 'DESC']],
      })

      if (!chat) {
        return next(new APIError('Chat not found', httpStatus.NOT_FOUND));
      }

      // const userChats = await user.getChats({
      //   attributes: ['id', 'name'],
      //   where: {
      //     id: req.params.chatId,
      //   },
      //   include: [
      //     {
      //       model: models.User,
      //       attributes: ['id', 'username'],
      //       through: {
      //         attributes: [],
      //       },
      //     },
      //     {
      //       model: models.Message,
      //       attributes: ['id', 'userId', 'text', 'timestamp'],
      //       include: [{
      //         model: models.User,
      //         attributes: ['id', 'username'],
      //       }],
      //     },
      //   ],
      //   order: [[models.Message, 'timestamp', 'DESC']],
      // });

      // if (!userChats[0]) {
      //   return next(new APIError('Chat not found', httpStatus.UNAUTHORIZED));
      // }

      // // Temp Fix to remove join table
      // const chat = userChats.map((userChat) => {
      //   userChat = userChat.toJSON(); // eslint-disable-line no-param-reassign
      //   delete userChat.chatMembers; // eslint-disable-line no-param-reassign
      //   return userChat;
      // })[0];

      chat.messages.reverse();
      return res.json(chat);
    } catch (err) {
      return next(err);
    }
  },
  list: async (req, res, next) => {
    try {
      const chats = await models.Chat.findAll({
        attributes: ['id', 'name']
      })

      return res.json(chats);
    } catch (err) {
      return next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const chat = await models.Chat.create(req.body, {
        attributes: ['id', 'name']
      });

      return res.status(httpStatus.CREATED).json(chat);
    } catch (err) {
      return next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const chat = await models.Chat.findByPk(req.params.chatId, {
        include: [
          {
            model: models.User,
            where: {
              id: req.user.id,
            },
            required: true,
          },
        ],
      });

      if (!chat) {
        return next(new APIError('Chat not found', httpStatus.NOT_FOUND));
      }
      await chat.update(req.body);
      return res.status(httpStatus.OK).json(chat);
    } catch (err) {
      return next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const chat = await models.Chat.findByPk(req.params.chatId, {
        include: [
          {
            model: models.User,
            where: {
              id: req.user.id,
            },
            required: true,
          },
        ],
      });

      if (!chat) {
        return next(new APIError('Chat not found', httpStatus.NOT_FOUND));
      }
      await chat.destroy();
      return res.status(httpStatus.OK).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  },

};
