const router = require('express').Router()
const { isAuthenticate } = require('../middlewares/authMiddleware')
const { addWorker } = require('./../controllers/customerController')

router.post('/worker/add', isAuthenticate, addWorker)

module.exports = router
