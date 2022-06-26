const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const FinancialMovement = sequelize.define('cnab', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: Sequelize.SMALLINT,
    allowNull: false
  },
  datetime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  value: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  cpf: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  card: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ownerName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  storeName: {
    type: Sequelize.STRING,
    allowNull: false
  },
},{
    timestamps: false
});

module.exports = FinancialMovement;