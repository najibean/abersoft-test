const bcrypt = require('bcryptjs')

exports.getHash = password => {
	const salt = bcrypt.genSaltSync(10)
	return bcrypt.hashSync(password, salt)
}

exports.checkHash = (password, hash) => {
	return bcrypt.compareSync(password, hash)
}
