import './App.css'
import Nav from './components/Nav'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Signin from './components/Signin'
import PaymentCard from './components/PaymentCard'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ManageAccount from './components/ManageAccount'
import React, { useState, useEffect } from 'react'
import ErrorMsg from './components/ErrorMsg'
import SuccessMsg from './components/SuccessMsg'

import signinService from './services/signin'
import signupService from './services/signup'
import paymentService from './services/payment'

function App () {
  const navigateTo = useNavigate()

  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [userNotSuscribed, setUserNotSuscribed] = useState(null)
  const [logged, setLogged] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // loged token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setToken(user.token)
    setLogged(false)
    window.localStorage.removeItem('loggedAppUser')
    navigateTo('/')
  }

  const handleSigninSubmit = async (credentials) => {
    try {
      const user = await signinService.login(credentials)
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      window.localStorage.removeItem('readyForSub')
      setUser(user)
      setUser(user)
      setSuccessMessage('Success')
      setLogged(true)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (e) {
      console.log(e)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSignupSubmit = async (credentials) => {
    try {
      const user = await signupService.signup(credentials)
      window.localStorage.setItem('readyForPayment', JSON.stringify(user))
      setUserNotSuscribed(user)
      setSuccessMessage('Success')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (e) {
      console.log(e)
      setErrorMessage('Something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateCustomer = async (credentials) => {
    try {
      const customer = await paymentService.customer(credentials)
      return customer
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='App'>
      <Nav />
      {
        successMessage
          ? <SuccessMsg message={successMessage} />
          : ''
      }
      {
        errorMessage
          ? <ErrorMsg message={errorMessage} />
          : ''
      }
      <Routes>
        <Route path='' element={<Landing />} />
        <Route path='SignUp' element={<Signup handleSignupSubmit={handleSignupSubmit} handleCreateCustomer={handleCreateCustomer} />} />
        <Route path='SignIn' element={<Signin handleSigninSubmit={handleSigninSubmit} />} />
        <Route path='Payment' element={<PaymentCard />} />
        <Route path='ManageMyAccount' element={<ManageAccount handleLogout={handleLogout} />} />
      </Routes>
    </div>
  )
}

export default App
