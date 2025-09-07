'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        tag_id: 2
      }, // Alice: Python
      {
        student_id: 1,
        tag_id: 3
      }, // Alice: SQL
      {
        student_id: 1,
        tag_id: 5
      }, // Alice: Machine Learning
      {
        student_id: 2,
        tag_id: 1
      }, // Bob: Java
      {
        student_id: 2,
        tag_id: 4
      }, // Bob: React
      {
        student_id: 2,
        tag_id: 6
      }, // Bob: CSS
    ], { });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('StudentTags', null, {});
  }
};
