require('dotenv').config()
require('./db')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const notFound = require('./middleware/notFound.js')
const handleError = require('./middleware/handleError')
const PORT = process.env.PORT || 3001
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
const paymentRouter = require('./controllers/paymentRouter')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))

app.use(morgan('tiny'))

app.use(express.static('../Optimave/dist'))

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use('/api/payments', paymentRouter)

app.use(notFound)
app.use(handleError)

const server = app.listen(PORT, () => {
  console.log(`server en puerto ${PORT}`)
})

module.exports = { app, server }
