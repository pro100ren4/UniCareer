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
    await queryInterface.bulkInsert('Companies', [
      {
        user_id: 3,
        name: 'TechCorp',
        website: 'https://techcorp.com',
        description: 'Leading software solutions provider.',
        verified: true,
        contact_person: 'Jane Doe',
        logo_path: '/logos/techcorp.png',
        createdAt: (new Date()).toISOString().split('T')[0],
        updatedAt: (new Date()).toISOString().split('T')[0],
      },
      {
        user_id: 4,
        name: 'InnoSoft',
        website: 'https://innosoft.io',
        description: 'Startup focusing on AI-driven apps.',
        verified: false,
        contact_person: 'John Roe',
        logo_path: '/logos/innosoft.png',
        createdAt: (new Date()).toISOString().split('T')[0],
        updatedAt: (new Date()).toISOString().split('T')[0],
      }
    ], { });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Companies', null, {});
  }
};
