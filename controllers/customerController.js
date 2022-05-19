const models = require('../models')
const { Worker, Customer } = models

exports.addWorker = async (req, res, next) => {
	try {
		const { customerId, workerId, email, isActive } = req.body

		const customer = await Customer.findOne({
			where: { id: customerId }
		})
		if (!customer) {
			return res.status(400).json({
				message: 'Customer not found'
			})
		}

		await Worker.create({
			customerId,
			workerId,
			email,
			isActive: 'true' ? 1 : 0
		})

		return res.status(200).json({
			statusCode: 200,
			message: 'Success',
			result: {
				worker: {
					workerId,
					email,
					isActive
				}
			}
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}
