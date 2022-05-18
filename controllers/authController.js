const models = require('../models')
const { Worker } = models

export const login = async (req, res, next) => {
	try {
		const { employee_id, password } = req.body
		const user = await Worker.findOne({
			where: { employee_id },
			attributes: {
				exclude: ['role']
			},
			include: [
				{
					model: Role,
					as: 'access_role',
					attributes: ['id', 'name']
				}
			]
		})

		if (!user) {
			return res.status(404).json(errorResponse('Employee ID not found'))
		}

		if (!checkHash(password, user.password)) {
			return res.status(400).json(errorResponse('Your password is wrong'))
		}

		const payload = {
			id: user.dataValues.id,
			email: user.dataValues.email
		}

		const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30d' })
		user.update({
			last_login: new Date(),
			token
		})

		delete user.dataValues.password
		user.dataValues['token'] = token

		return res.status(200).json(user)
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

export const logout = async (req, res, next) => {
	try {
		const token = null
		await Worker.update(
			{
				token
			},
			{
				where: { id: req.user.id }
			}
		)

		return res.status(200).json({
			message: 'You have been logout',
			token
		})
	} catch (err) {
		return next(err)
	}
}
