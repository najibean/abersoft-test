const models = require('../models')
const { Worker, Customer } = models

exports.addWorker = async (req, user, next) => {
	try {
		const { customerId } = req.body

		const customer = await Customer.findOne({
			where: { id: customerId }
		})
		if (!customer) {
			return res.status(400).json({
				message: 'Customer not found'
			})
		}

    
	} catch (err) {
		console.log(err)
		next(err)
	}
}
