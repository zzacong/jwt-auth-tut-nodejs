require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
// require('crypto').randomBytes(64).toString('hex')

const { verifyToken } = require('./middleware/auth')

const app = express()

app.use(express.json())

const posts = [
  {
    username: 'Joe',
    title: 'Post 1',
  },
  {
    username: 'Foo',
    title: 'Post 2',
  },
]

app.get('/posts', verifyToken, (req, res) => {
  res.json({
    user: posts.find(post => post.username === req.user.name),
    authData: req.user,
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server is listening on http://localhost:${PORT}`))
