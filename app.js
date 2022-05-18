const express = require('express')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3003

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((err, req, res, next) => {
	const isDev = req.app.get('env') === 'development'
	res.locals.error = err
	console.log('Error:', err.message)
	const message = isDev ? err.stack : 'Internal server error'
	res.status(err.status || 500).json({ message })
})

app.listen(port, () => {
	console.log(`App running on port ${port}`)
})
