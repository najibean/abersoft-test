'use strict'

const { getHash } = require('./../helpers/password')
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Workers', [
			{
				customerId: 1,
				workerId: 'worker.abersoft',
				email: 'worker@email.com',
				isActive: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Workers', null, {})
	}
}
