'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.addColumn('RefreshTokens', 'user_id', {
    type: Sequelize.INTEGER
  })
  await queryInterface.addColumn('RefreshTokens', 'ip', {
    type: Sequelize.STRING
  })
  await queryInterface.removeColumn('RefreshTokens', 'expires_at')
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  await queryInterface.removeColumn('RefreshTokens', 'user_id')
  await queryInterface.removeColumn('RefreshTokens', 'ip')
  await queryInterface.addColumn('RefreshTokens', 'expires_at', {
    allowNull: false,
    type: Sequelize.DATE
  })
}
