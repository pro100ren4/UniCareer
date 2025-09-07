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
    await queryInterface.bulkInsert('JobTags', [
      {
        job_id: 1,
        tag_id: 1,
      },
      {
        job_id: 1,
        tag_id: 3,
      }, //Backend Intern: Java, SQL
      {
        job_id: 2,
        tag_id: 2,
      },
      {
        job_id: 2,
        tag_id: 5,
      }, //AI Contest: Python, ML
      {
        job_id: 3,
        tag_id: 4,
      },
      {
        job_id: 3,
        tag_id: 6,
      }, //Frontend Project: React, CSS
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('JobTags', null, {});
  }
};
