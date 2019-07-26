module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'chat_app_development',
    host: 'localhost',
    dialect: 'postgres',
    underscored: true,
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'chat_app_test',
    host: 'localhost',
    dialect: 'postgres',
    underscored: true,
  },
  production: {
    username: 'postgres',
    password: 'postgres',
    database: 'database_production',
    host: 'localhost',
    dialect: 'postgres',
    underscored: true,
  },
  PORT: process.env.PORT || 5000,
  PUBLIC_URL: process.env.PUBLIC_URL,
}