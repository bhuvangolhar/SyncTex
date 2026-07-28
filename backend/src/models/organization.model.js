const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orgName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Prevents duplicate organization names
  },
});

module.exports = Organization;