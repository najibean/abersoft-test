'use strict'
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ProjectManagers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			customerId: {
				type: Sequelize.INTEGER
			},
			workerId: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING
			},
			isActive: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('ProjectManagers')
	}
}
