const jwt = require('jsonwebtoken')
const { getHash, checkHash } = require('./../helpers/password')
const models = require('../models')
const { User } = models

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({
			where: { email }
		})

		if (!user) {
			return res.status(404).send('Email not found')
		}

		if (!checkHash(password, user.password)) {
			return res.status(400).send('Your password is wrong')
		}

		const payload = {
			email: user.dataValues.email,
			name: user.dataValues.name
		}

		const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30d' })
		User.update({ token }, { where: { id: user.id } })

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
		next(err)
	}
}

exports.logout = async (req, res, next) => {
	try {
		User.update(
			{
				token: null
			},
			{
				where: { id: req.user.id }
			}
		)

		return res.status(200).json({
			statusCode: 200,
			message: 'Logout Success',
			result: null
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}

exports.profile = async (req, res, next) => {
	try {
		const profileUser = await User.findOne({
			where: { email: req.user.email }
		})
		if (!profileUser) {
			return res.status(400).json({
				message: 'Worker not found'
			})
		}

		return res.status(200).json({
			statusCode: 200,
			message: 'Success',
			result: {
				profile: {
					id: profileUser.id,
					email: profileUser.email,
					name: profileUser.name
				}
			}
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}

exports.changePassword = async (req, res, next) => {
	try {
		const { email, newPassword, retypeNewPassword } = req.body

		const userEmail = await User.findOne({
			where: { email }
		})
		if (!userEmail) {
			return res.status(400).json({
				message: 'Email not found'
			})
		}

		if (newPassword !== retypeNewPassword) {
			return res.status(400).json({
				message: 'Password not match'
			})
		}

		await User.update(
			{ password: getHash(newPassword) },
			{
				where: { id: req.worker.id }
			}
		)

		return res.status(200).json({
			statusCode: 200,
			message: 'Success change password',
			result: null
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}
