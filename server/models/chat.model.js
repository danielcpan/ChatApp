
const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    }, {
      tableName: 'chats',
      underscored: true,
      sequelize,
    });
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'chat_member',
      foreignKey: {
        name: 'chatId',
        field: 'chat_id',
      },
      onDelete: 'cascade',
    });
  }
};
