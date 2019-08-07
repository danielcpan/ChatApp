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
        allowNull: false,
        unique: {
          args: true,
          msg: 'Username already exists'
        },
        validate: {
          len: { 
            args: [2, 23],
            msg: 'Username must be between 2 and 23 characters long'
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email already exists'
        },
        validate: {
          isEmail: { 
            args: true,
            msg: 'Invalid Email'
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [8, 255],
        },
        validate: {
          len: { 
            args: [8, 255],
            msg: 'Password must be between 8 and 255 characters long'
          },
        },
      },
    }, {
      tableName: 'users',
      modelName: 'users',
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
      // through: 'chat_members',
      through: models.ChatMember,
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
      onDelete: 'cascade',
    });
  }
};
