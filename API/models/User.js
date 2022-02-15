const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')
const { model, Schema } = mongoose

const userSchema = new Schema({
  name: String,
  passwordHash: String,
  email: {
    type: String
  },
  stripeId: String,
  key: String,
  suscribed: {
    type: Boolean,
    default: false
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User
