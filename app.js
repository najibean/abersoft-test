const express = require('express')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3003

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((err, req, res, next) => {
	const isProd = process.env.NODE_ENV === 'production'
	console.error('Error:', err.message)
	let message = isProd ? 'Internal server error' : err.message
	return res.status(err.status || 500).json({ message })
})

app.listen(port, () => {
	console.log(`App running on port ${port}`)
})
