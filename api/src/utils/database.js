const Sequelize = require('sequelize');

const sequelize = new Sequelize('challengedb', 'root', 'admin', {
  dialect: 'mysql',
  host: 'mysql-container'
});

module.exports = sequelize;