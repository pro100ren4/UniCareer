'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      job_id: { 
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      student_id: { 
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      message: { 
        type: Sequelize.TEXT,
      },
      resume_snapshot_path: { 
        type: Sequelize.TEXT,
      },
      status: { 
        defaultValue: 'pending',
        type: Sequelize.ENUM('pending','accepted','rejected')
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
    await queryInterface.dropTable('Applications');
  }
};