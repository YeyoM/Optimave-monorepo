import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PaymentCard = () => {
  const navigateTo = useNavigate()

  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [sessionId, setSessionId] = useState('')

  const baseUrl = '/api/payments'
  const lookup_key = 'price_1KSodNFoTXwMjfbUmMfUjsPh'

  useEffect(() => {
    if (!window.localStorage.getItem('readyForPayment')) {
      navigateTo('/')
    }

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      console.log(window.localStorage.getItem('readyForPayment'))
      console.log('aqui')
      setSuccess(true)
      setSessionId(query.get('session_id'))
      console.log(window.localStorage.getItem('readyForPayment'))
      // aqui hacer un put al usuario con el que se suscribio
      const userSuscribed = window.localStorage.getItem('readyForPayment')
      const id = JSON.parse(userSuscribed).id
      // aqui generar el key en el backend
      updateUserSuscribed(id)
        .then(() => {
          window.localStorage.removeItem('readyForPayment')
          navigateTo('/SignIn')
        })
        .catch(e => console.log(e))
    } else if (query.get('canceled')) {
      setSuccess(false)
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])

  // generar el key cuando hagamos un put a esta ruta
  const updateUserSuscribed = async (id) => {
    await axios.put(`/api/users/${id}`, id)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userToGetCustomer = window.localStorage.getItem('readyForPayment')
    console.log(userToGetCustomer)
    if (userToGetCustomer) {
      const user = JSON.parse(userToGetCustomer)
      console.log(user)
      const customer = user.stripeId
      const payload = {
        lookup_key,
        customer
      }
      try {
        const { data } = await axios.post(baseUrl, payload)
        console.log(data)
        window.location.href = data.url
      } catch (e) {
        console.log(e)
      }
    } else {
      navigateTo('/SignUp')
    }
  }

  return (
    <div className='payment-container'>
      <div className='payment-card'>
        <form onSubmit={handleSubmit}>
          <h4>Buy Optimave</h4>
          <h1>$100.00 mxn</h1>
          <p>Unlimited Access</p>
          <p>Private channel on Discord</p>
          <p>Direct contact with out Team</p>
          <button id='checkout-and-portal-button' type='submit'>
            Checkout
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentCard
