'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
  await queryInterface.bulkInsert('Tags', [
    {
      name: 'Java',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      name: 'Python',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      name: 'SQL',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      name: 'React',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      name: 'Machine Learning',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      name: 'CSS',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
  ], {});
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Tags', null, {});
}
