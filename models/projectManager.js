'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class ProjectManager extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ProjectManager.init(
		{
			customerId: DataTypes.INTEGER,
			workerId: DataTypes.STRING,
			email: DataTypes.STRING,
			isActive: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'ProjectManager'
		}
	)
	return ProjectManager
}
