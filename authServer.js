require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
// require('crypto').randomBytes(64).toString('hex')

const { generateAccessToken } = require('./middleware/auth')

const app = express()

app.use(express.json())

let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (!refreshToken) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(
    refreshToken => refreshToken !== req.body.token
  )
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate User
  // ...
  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is listening on http://localhost:${PORT}`))
