const jwt = require('jsonwebtoken')

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

const verifyToken = (req, res, next) => {
  // GET AUTH HEADER VALUE
  const bearerHeader = req.headers['authorization']

  const token = bearerHeader && bearerHeader.split(' ')[1]

  if (!token) return res.sendStatus(401) // UNAUTHORIZED
  // Asynchronous way
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403) // FORBIDDEN
    req.user = user
    next()
  })
}

const generateAccessToken = user => {
  // Synchronous way
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports = { verifyToken, generateAccessToken }
