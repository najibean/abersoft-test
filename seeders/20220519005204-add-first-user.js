'use strict'

const { getHash } = require('../helpers/password')
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Users', [
			{
				name: 'admin',
				email: 'admin-abersoft@yopmail.com',
				password: getHash('password123'),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {})
	}
}
