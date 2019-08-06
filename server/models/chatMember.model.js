const Sequelize = require('sequelize');

// Many to Many association table between Chats and Users
module.exports = class ChatMember extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'chat_members',
      modelName: 'chatMembers',
      underscored: true,
      sequelize,
    });
  }
};
