require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
// require('crypto').randomBytes(64).toString('hex')

const { authenticate } = require('./middleware/auth')

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

app.post('/login', (req, res) => {
  // Authenticate User
  // ...
  const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})

app.get('/posts', authenticate, (req, res) => {
  res.json(posts.find(post => post.username === req.user.name))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server is listening on http://localhost:${PORT}`))
