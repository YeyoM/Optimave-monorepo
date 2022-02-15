const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
require('dotenv').config()

loginRouter.post('/', async (req, res) => {
  const { body } = req
  const { email, password } = body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.send({ message: 'Not a user' }).status(401)
    } else {
      if (!user.stripeId) {
        return res.send({ message: 'Not a suscribed' }).status(401)
      } else {
        const passwordCorrect = user === null
          ? null
          : await bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordCorrect)) {
          return res.status(401).json({
            error: 'Invalid username or password'
          })
        }

        const userForToken = {
          id: user._id,
          username: user.username
        }

        const token = jwt.sign(
          userForToken,
          process.env.SECRET,
          {
            expiresIn: 60 * 60 * 24
          }
        )

        return res.send({
          name: user.name,
          username: user.username,
          key: user.key,
          token
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = loginRouter
