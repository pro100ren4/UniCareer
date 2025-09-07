'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Jobs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    company_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    requirements: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.ENUM('internship', 'project', 'contest'),
    },
    city: {
      type: Sequelize.STRING,
    },
    remote: {
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    salary_fron: {
      type: Sequelize.DECIMAL(10, 2),
    },
    salary_to: {
      type: Sequelize.DECIMAL(10, 2),
    },
    status: {
      defaultValue: 'active',
      type: Sequelize.ENUM('active', 'closed', 'draft', 'moderation')
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
  await queryInterface.dropTable('Jobs');
}