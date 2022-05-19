'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Customers', [
			{
				company: 'abersoft_company',
				projectManager: 1,
				worker: 1,
				isActive: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Customers', null, {})
	}
}
