// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
  logging: false,
});

const Log = sequelize.define('Log', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  serviceName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  severity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = { sequelize, Log };
