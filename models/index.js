'use strict'

require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
let config = require('./../config/database')[env]
const db = {}

let sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		...config,
		dialectOptions: {
			typeCast: function (field, next) {
				if (field.type === 'DATETIME') {
					return field.string()
				}
				return next()
			}
		},
		timezone: '+07:00'
	}
)

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		)
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		)
		db[model.name] = model
	})

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
