
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
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'first_name',
        validate: {
          len: [2, 23],
        },
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'last_name',
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
      userRole: {
        type: DataTypes.STRING(255),
        defaultValue: 'GUEST',
        field: 'user_role',
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
};
