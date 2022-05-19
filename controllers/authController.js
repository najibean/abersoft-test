const jwt = require('jsonwebtoken')
const { checkHash } = require('./../helpers/password')
const models = require('../models')
const { Worker } = models

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const worker = await Worker.findOne({
			where: { email },
			attributes: {
				exclude: ['password']
			}
		})

		if (!worker) {
			return res.status(404).send('Email not found')
		}

		if (!checkHash(password, worker.password)) {
			return res.status(400).send('Your password is wrong')
		}

		const payload = {
			email: worker.dataValues.email,
			name: worker.dataValues.name
		}

		const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30d' })
		Worker.update({ token }, { where: { id: worker.id } })

		return res.status(200).json({
			statusCode: 200,
			message: 'Success',
			result: {
				login: {
					token
				}
			}
		})
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

export const logout = async (req, res, next) => {
	try {
		Worker.update(
			{
				token: null
			},
			{
				where: { id: req.user.id }
			}
		)

		return res.status(200).json({
			statusCode: 200,
			message: 'Logout Succes',
			result: null
		})
	} catch (err) {
		return next(err)
	}
}
