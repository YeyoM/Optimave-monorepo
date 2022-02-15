const mongoose = require('mongoose')
const { MONGODB_URI_PROD, MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGODB_URI_TEST
  : MONGODB_URI_PROD

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB conected succesfully'))
  .catch(err => console.log(err))
