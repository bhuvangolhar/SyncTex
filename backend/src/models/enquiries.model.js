const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Enquiry = sequelize.define('Enquiry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  enquiryCode: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'no-email@provided.com',
    validate: {
      isEmail: true,
    },
  },
  status: {
    type: DataTypes.ENUM('Fresh', 'In Contact', 'Closed'),
    defaultValue: 'Fresh',
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
}, {
  tableName: 'Enquiries', // Explicitly locks table name to PascalCase
  timestamps: true,
  hooks: {
    beforeCreate: async (enquiry) => {
      if (!enquiry.enquiryCode) {
        const count = await Enquiry.count();
        enquiry.enquiryCode = `ENQ-${101 + count}`;
      }
    },
  },
});

module.exports = Enquiry;