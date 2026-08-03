const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Organization = require('./organization.model');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'EMPLOYEE'),
    defaultValue: 'EMPLOYEE',
  },
  organizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Organizations', // Points directly to the Organizations table
      key: 'id',
    },
  },
}, {
  tableName: 'Users', // Explicitly locks table name to PascalCase
  timestamps: true,   // Generates createdAt and updatedAt
});

// Relationships
Organization.hasMany(User, { foreignKey: 'organizationId' });
User.belongsTo(Organization, { foreignKey: 'organizationId' });

module.exports = User;