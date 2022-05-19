const router = require('express').Router()
const auth = require('./auth')
const customer = require('./customer')

const { isAuthenticate } = require('../middlewares/authMiddleware')

router.get('/test', (req, res) => {
	return res.sendStatus(200)
})

router.use('/auth', auth)
router.use('/customer', customer)

module.exports = router
