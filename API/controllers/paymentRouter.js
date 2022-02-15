const paymentRouter = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_PAY)
const express = require('express')

const YOUR_DOMAIN = 'http://localhost:3000/Payment'

paymentRouter.post('/', async (req, res) => {
  // Create a Checkout Session for the payment
  console.log('a')
  const price = req.body.lookup_key
  const customer = req.body.customer
  console.log(stripe)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price,
        quantity: 1
      }
    ],
    customer,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`
  })
  console.log(session)
  return res.status(201).send(session)
})

paymentRouter.post('/customer', async (req, res) => {
  try {
    const {
      name,
      email
    } = req.body
    const customer = await stripe.customers.create({
      name: name,
      email: email
    })
    console.log(customer)
    return res.status(201).send(customer)
  } catch (e) {
    console.log(e)
  }
})

paymentRouter.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  let data
  let eventType
  let event
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    const signature = req.headers['stripe-signature']

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.', err)
      return res.sendStatus(400)
    }
    // Extract the object from the event.
    data = event.data
    eventType = event.type

    console.log(data)

    if (eventType === 'charge.succeeded') {
      console.log('Invoice Paid')
    }
  } else {
    data = req.body.data
    eventType = req.body.type
  }

  if (eventType === 'checkout.session.completed') {
    console.log('🔔  Payment received!')
  } else if (eventType === 'invoice.paid') {
    console.log('invoice paid x2')
  }
  res.sendStatus(200)
})

module.exports = paymentRouter
