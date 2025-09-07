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
    await queryInterface.bulkInsert('Students', [
      {
        user_id: 1, 
        full_name: 'Alice Johnson', 
        university: 'MIT', 
        faculty: 'Computer Science', 
        course: 2, 
        phone: '+123456789', 
        about: 'Interested in AI and data science.', 
        resume_path: '/resumes/alice.pdf',
        createdAt: (new Date()).toISOString().split('T')[0],
        updatedAt: (new Date()).toISOString().split('T')[0],
      },
      {
        user_id: 2, 
        full_name: 'Bob Smith', 
        university: 'Stanford', 
        faculty: 'Software Engineering', 
        course: 3, phone: '+987654321', 
        about: 'Passionate about backend systems.', 
        resume_path: '/resumes/bob.pdf',
        createdAt: (new Date()).toISOString().split('T')[0],
        updatedAt: (new Date()).toISOString().split('T')[0],
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Students', null, {});
  }
};
