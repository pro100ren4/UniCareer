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
    await queryInterface.bulkInsert('Applications', [
      {
        job_id: 1,
        student_id: 1,
        message: 'I am excited to apply for the backend internship.',
        resume_snapshot_path: '/resumes/alice_snapshot.pdf'
      },
      {
        job_id: 3,
        student_id: 2,
        message: 'Frontend is my passion, looking forward to contributing.',
        resume_snapshot_path: '/resumes/bob_snapshot.pdf'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Applications', null, {});
  }
};
