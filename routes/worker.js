const router = require('express').Router()
const { isAuthenticate } = require('../middlewares/authMiddleware')

router.get('/test', (req, res) => {
	return res.sendStatus(200)
})

module.exports = router
