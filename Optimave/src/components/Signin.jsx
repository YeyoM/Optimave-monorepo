import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import ErrorMsg from './ErrorMsg'
import SuccessMsg from './SuccessMsg'

const Signin = ({ handleSigninSubmit }) => {
  const navigateTo = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      email,
      password
    }
    if (!email || !password) {
      setError('Missing Information')
      setTimeout(() => {
        setError('')
      }, 5000)
    } else {
      const data = await handleSigninSubmit(credentials)
      console.log(data)
      setEmail('')
      setPassword('')
      navigateTo('/ManageMyAccount')
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
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

      <div className='sign-card-page'>
        <div className='sign-card'>
          <form onSubmit={handleSubmit}>
            <p className='sign-title'>Sign In</p>
            <label>Your email</label>
            <input type='text' onChange={handleEmailChange} />
            <label>Your password</label>
            <input type='password' onChange={handlePasswordChange} />
            <p><small>Don't have an account yet? Create one <Link to='/SignUp'>here</Link> and buy it!</small></p>
            <button className='sign-btn'>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
