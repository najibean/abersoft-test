const router = require('express').Router()
const { login, logout, profile } = require('./../controllers/authController')
const { isAuthenticate } = require('../middlewares/authMiddleware')

router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', isAuthenticate, profile)

module.exports = router
