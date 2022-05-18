const jwt = require('jsonwebtoken')
const errorResponse = require('../helpers/errorResponse')
const models = require('../models')

const { Worker } = models

export const isAuthenticate = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json(errorResponse('Unauthorized'))
	}

	const splitToken = req.headers.authorization.split(' ')
	if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
		return res.status(400).json(errorResponse('Wrong authorization format'))
	}

	jwt.verify(
		splitToken[1],
		process.env.SECRET,
		{ algorithms: ['HS256'] },
		async (err, payload) => {
			if (err && err.name === 'TokenExpiredError') {
				return res.status(401).json(errorResponse('Expired Token'))
			} else if (err) {
				return res.status(401).json(errorResponse('Invalid Token'))
			} else {
				try {
					const user = await Worker.findOne({
						where: {
							id: payload.id
						}
					})

					if (!user) {
						return res.status(401).json(errorResponse('Invalid Token'))
					}

					if (user.dataValues.token !== splitToken[1]) {
						return res.status(401).json(errorResponse('Invalid Token'))
					}

					req.user = user
					next()
				} catch (error) {
					next(error)
				}
			}
		}
	)
}
