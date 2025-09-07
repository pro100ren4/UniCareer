'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   */
  await queryInterface.bulkInsert('Users', [
    {
      email: 'alice@student.com',
      password_hash: 'hash1',
      role: 'student',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      email: 'bob@student.com',
      password_hash: 'hash2',
      role: 'student',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      email: 'hr@techcorp.com',
      password_hash: 'hash3',
      role: 'company',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      email: 'jobs@innosoft.io',
      password_hash: 'hash4',
      role: 'company',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    },
    {
      email: 'admin@career.com',
      password_hash: 'hash5',
      role: 'admin',
      createdAt: (new Date()).toISOString().split('T')[0],
      updatedAt: (new Date()).toISOString().split('T')[0],
    }
  ], {});

}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   */
  await queryInterface.bulkDelete('Users', null, {});

}
