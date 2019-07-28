const models = require('../models')

module.exports ={
  list: async (req, res, next) => {
    const messages = await models.Message.findAll()
    res.json(messages)
  },
  create: async (req, res, next) => {
    const { input } = res.body
    const message = models.Message.create(input);
    res.json(message)
  },
}