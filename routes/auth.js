const router = require('express').Router()
const {
	login,
	logout,
	profile,
	changePassword
} = require('./../controllers/authController')
const { isAuthenticate } = require('../middlewares/authMiddleware')

router.post('/login', login)
router.post('/logout', isAuthenticate, logout)
router.get('/profile', isAuthenticate, profile)
router.post('/change-password', isAuthenticate, changePassword)

module.exports = router
