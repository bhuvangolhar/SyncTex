'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enquiries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enquiryCode: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no-email@provided.com',
      },
      status: {
        type: Sequelize.ENUM('Fresh', 'In Contact', 'Closed'),
        defaultValue: 'Fresh',
      },
      priority: {
        type: Sequelize.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Medium',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Enquiries');
  },
};