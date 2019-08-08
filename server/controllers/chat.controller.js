const httpStatus = require('http-status');
const models = require('../models');
const APIError = require('../utils/APIError.utils');

module.exports = {
  get: async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.user.id);

      if (!user) {
        return next(new APIError('User does not own this chat', httpStatus.UNAUTHORIZED));
      }
      
      const userChats = await user.getChats({
        attributes: ['id', 'name'],
        where: {
          id: req.params.chatId
        },
        include: [
          {
            model: models.User,
            attributes: ['id', 'username'],
            through: {
              attributes: []
            }
          },
          {
            model: models.Message,
            attributes: ['id', 'userId', 'text', 'timestamp'],
            include: [{
              model: models.User,
              attributes: ['id', 'username'],
            }],
          }
        ],
        order: [[models.Message, 'timestamp', 'DESC']],
      })
      
      if (!userChats[0]) {
        return next(new APIError('Chat not found', httpStatus.UNAUTHORIZED));
      }

      // Temp Fix to remove join table
      const chat = userChats.map(userChat => {
        userChat = userChat.toJSON()
        delete userChat.chatMembers
        return userChat;
      })[0]

      chat.messages.reverse();
      return res.json(chat);
    } catch (err) {
      return next(err);
    }
  },
  list: async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.user.id)

      if (!user) {
        return next(new APIError('User does not own this chat', httpStatus.NOT_FOUND));
      }

      const userChats = await user.getChats({
        attributes: ['id', 'name'],
        include: [
          {
            model: models.User,
            attributes: ['id', 'username'],
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
              }
            ]
          },
        ],
        order: [[models.Message, 'timestamp', 'DESC']],
      })

      // Temp Fix to remove join table
      const chats = userChats.map(userChat => {
        userChat = userChat.toJSON()
        delete userChat.chatMembers
        return userChat;
      })

      return res.json(chats);
    } catch (err) {
      return next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const users = await models.User.findAll({ 
        where: { 
          id: req.body.usersIdList.concat(req.user.id) 
        }
      });

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
              id: req.user.id
            },
            required: true
          }
        ]
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
              id: req.user.id
            },
            required: true
          }
        ]
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
