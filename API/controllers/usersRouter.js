const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const uuidv4 = require('uuid')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const {
      name,
      password,
      email,
      stripeId
    } = body

    console.log(body)

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      passwordHash,
      email,
      stripeId
    })

    const savedUser = await user.save()

    res
      .status(201)
      .json(savedUser)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

usersRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const key = uuidv4.v4()
    await User.findByIdAndUpdate(id, { suscribed: true, key: key })
    res.status(201).json({ message: 'user updated' })
  } catch (err) {
    console.log(err)
  }
})

module.exports = usersRouter
