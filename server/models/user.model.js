
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
          len: [2, 23],
        },
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [8, 255],
        },
      },
    }, {
      tableName: 'users',
      underscored: true,
      sequelize,
      hooks: {
        afterValidate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword; // eslint-disable-line no-param-reassign
        },
      },
    });
  }

  static associate(models) {
    this.belongsToMany(models.Chat, {
      through: 'chat_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
      onDelete: 'cascade',
    });
  }
};
