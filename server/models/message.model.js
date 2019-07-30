
const Sequelize = require('sequelize');

module.exports = class Message extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
    }, {
      tableName: 'messages',
      modelName: 'messages',
      underscored: true,
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Chat, {
      foreignKey: {
        name: 'chatId',
        field: 'chat_id',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
    this.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  }
};
