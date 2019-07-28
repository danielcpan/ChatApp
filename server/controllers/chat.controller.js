const models = require('../models')

module.exports ={
  get: async (req, res, next) => {
    const id = req.params.id;
    const chat = await models.Chat.findByPk(id);
    res.json(chat);
  },
  list: async (req, res, next) => {
    const chats = await models.Chat.findAll()
    res.json(chats)
  },
  create: async (req, res, next) => {
    const { input } = res.body
    const chat = models.Chat.create(input);
    res.json(chat)
  },
  update: async (req, res, next) => {
    const { input } = res.body
    await models.Chat.update(input, { where: { id: input.id } });
    return models.Chat.findByPk(input.id);
  },
  delete: async (req, res, next) => {
    const { id } = res.body
    models.Chat.destroy({ where: { id } })
  }
}