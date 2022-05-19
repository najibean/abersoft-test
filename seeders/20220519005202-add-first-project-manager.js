'use strict'

const { getHash } = require('../helpers/password')
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('ProjectManagers', [
			{
				customerId: 1,
				workerId: 'manager.abersoft',
				email: 'manager@email.com',
				isActive: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('ProjectManagers', null, {})
	}
}
