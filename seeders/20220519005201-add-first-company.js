'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Companies', [
			{
				name: 'abersoft_company',
				organizationNumber: 'ABC456',
				city: 'Batam',
				address: 'Batam Center',
				postalCode: 12345,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Companies', null, {})
	}
}
