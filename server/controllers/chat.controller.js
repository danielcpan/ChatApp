const Sequelize = require('sequelize');
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
            model: models.User,
            attributes: ['id', 'username'],
            where: {
              id: {
                [Sequelize.Op.notIn]: [req.user.id],
              },
            },
            through: {
              attributes: [],
            },
          },
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
      });

      const user = await chat.getUsers({ where: {id: req.user.id}})

      if (!user[0]) {
        return next(new APIError('User does not own this chat', httpStatus.UNAUTHORIZED));
      }

      // console.log(users[0].toJSON())
      // console.log(await chat.getUsers())

      // RAW QUERY TEST
      // const chat = await models.sequelize
      //   .query(`
      //     SELECT messages.id, text, messages.created_at, username
      //     FROM messages
      //     INNER JOIN
      //     users ON messages.user_id = users.id
      //     WHERE chat_id = 1
      //     ORDER BY created_at DESC
      //     LIMIT 1`, {
      //       model: models.Message,
      //       mapToModel: true
      //     }
      //   )
      if (!chat) {
        return next(new APIError('Chat not found', httpStatus.NOT_FOUND));
      }
      chat.messages.reverse();
      return res.json(chat);
    } catch (err) {
      return next(err);
    }
  },
  list: async (req, res, next) => {
    try {
      const chats = await models.Chat.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: models.User,
            attributes: ['id', 'username'],
            through: {
              attributes: [],
              where: { userId: req.user.id }
            },
            required: true
          },
          {
            model: models.Message,
            attributes: ['id', 'userId', 'text', 'timestamp'],
            include: [
              {
                model: models.User,
                attributes: ['username'],
              },
            ],
          },
        ],
        order: [[models.Message, 'timestamp', 'DESC']],
      });

      return res.json(chats);
    } catch (err) {
      return next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const users = await models.User.findAll({ where: { id: req.body.usersIdList } });
      if (users.length === 0) {
        return next(new APIError('Users not found', httpStatus.NOT_FOUND));
      }
      const chatName = users.map(user => user.username).join(', ');
      const newChat = await models.Chat.create({ name: chatName });
      await newChat.setUsers(users);

      const chat = await models.Chat.findByPk(newChat.id, {
        include: [
          {
            model: models.User,
            attributes: ['id', 'username'],
            where: {
              id: {
                [Sequelize.Op.notIn]: [1],
              },
            },
            through: {
              attributes: [],
            },
          },
          {
            model: models.Message,
            attributes: ['id', 'userId', 'text', 'timestamp'],
            include: [
              {
                model: models.User,
                attributes: ['username'],
              },
            ],
          },
        ],
      });

      return res.status(httpStatus.CREATED).json(chat);
    } catch (err) {
      return next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const chat = await models.Chat.findByPk(req.params.chatId);
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
      const chat = await models.Chat.findByPk(req.params.chatId);
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
