const models = require('../models')

module.exports ={
  get: async (req, res, next) => {
    const id = req.params.id;
    const user = await models.User.findByPk(id);
    res.json(user);
  },
  list: async (req, res, next) => {
    const users = await models.User.findAll()
    res.json(users)
  },
  create: async (req, res, next) => {
    const { input } = res.body
    const user = models.User.create(input);
    res.json(user)
  },
  update: async (req, res, next) => {
    const { input } = res.body
    await models.User.update(input, { where: { id: input.id } });
    return models.User.findByPk(input.id);
  },
  delete: async (req, res, next) => {
    const { id } = res.body
    models.User.destroy({ where: { id } })
  }
}