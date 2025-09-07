'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Students', {
    user_id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    full_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    university: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    faculty: {
      type: Sequelize.STRING,
    },
    course: {
      validate: {
        min: 1,
      },
      type: Sequelize.INTEGER,
    },
    phone: {
      type: Sequelize.STRING,
    },
    about: {
      type: Sequelize.TEXT,
    },
    resume_path: {
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Students');
}