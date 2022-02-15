import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ErrorMsg from './ErrorMsg'
import SuccessMsg from './SuccessMsg'

const Signup = ({ handleSignupSubmit, handleCreateCustomer }) => {
  const navigateTo = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const credentialsToCreateCustomer = {
      name,
      email
    }

    const customer = await handleCreateCustomer(credentialsToCreateCustomer)
    const stripeId = customer.id

    console.log(stripeId)

    const credentials = {
      name,
      email,
      password,
      stripeId
    }
    if (!name ||
      !email ||
      !password
    ) {
      setError('Missing Information')
      setTimeout(() => {
        setError('')
      }, 5000)
    } else {
      console.log(credentials)
      handleSignupSubmit(credentials)
      setName('')
      setEmail('')
      setPassword('')
      // redirigir al pago
      setSuccess('Now proceed to payment')
      navigateTo('/Payment')
    }
  }

  return (
    <div>
      <div className='sign-card-page'>
        {
        error
          ? <ErrorMsg message={error} />
          : ''
      }
        {
        success
          ? <SuccessMsg message={success} />
          : ''
      }
        <div className='sign-card'>
          <form onSubmit={handleSubmit}>
            <p className='sign-title'>Sign Up</p>
            <label>Your name</label>
            <input type='text' value={name} onChange={handleNameChange} />
            <label>Your email</label>
            <input type='email' value={email} onChange={handleEmailChange} />
            <label>Your password</label>
            <input type='password' value={password} onChange={handlePasswordChange} />
            <p><small>Already have an account? Log in<Link to='/SignIn'>here</Link>!</small></p>
            <button className='sign-btn'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
