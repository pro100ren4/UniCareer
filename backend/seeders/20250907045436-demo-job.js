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
  await queryInterface.bulkInsert('Jobs', [
    {
      company_id: 3,
      title: 'Backend Intern',
      description: 'Work on APIs and databases.',
      requirements: 'Java, SQL basics',
      type: 'internship',
      city: 'New York',
      remote: true,
      salary_fron: 1000,
      salary_to: 1500,
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      company_id: 3,
      title: 'AI Contest',
      description: 'Participate in ML challenge.',
      requirements: 'Python, ML knowledge',
      type: 'contest',
      city: 'Online',
      remote: true,
      salary_fron: null,
      salary_to: null,
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      company_id: 4,
      title: 'Frontend Project',
      description: 'Build UI for new platform.',
      requirements: 'React, JS, CSS',
      type: 'project',
      city: 'San Francisco',
      remote: false,
      salary_fron: 2000,
      salary_to: 3000,
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
  await queryInterface.bulkDelete('Jobs', null, {});
}
