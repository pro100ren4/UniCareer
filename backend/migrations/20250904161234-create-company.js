'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      user_id: { 
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { 
        allowNull: false,
        type: Sequelize.STRING,
      },
      website: { 
        type: Sequelize.STRING,
      },
      description: { 
        type: Sequelize.TEXT,
      },
      verified: {
        defaultValue: false, 
        type: Sequelize.BOOLEAN,
      },
      contact_person: { 
        type: Sequelize.STRING,
      },
      logo_path: { 
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};