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
  await queryInterface.bulkInsert('StudentTags', [
    {
      student_id: 1,
      tag_id: 2,
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    }, // Alice: Python
    {
      student_id: 1,
      tag_id: 3,
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    }, // Alice: SQL
    {
      student_id: 1,
      tag_id: 5,
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    }, // Alice: Machine Learning
    {
      student_id: 2,
      tag_id: 1,
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    }, // Bob: Java
    {
      student_id: 2,
      tag_id: 4,
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    }, // Bob: React
    {
      student_id: 2,
      tag_id: 6,
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    }, // Bob: CSS
  ], {});
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('StudentTags', null, {});
}
