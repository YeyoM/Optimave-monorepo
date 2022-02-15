import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Nav = () => {
  const navigateTo = useNavigate()

  const [user, setUser] = useState('')

  useEffect(() => {
    if (!window.localStorage.getItem('loggedAppUser')) {
      setUser('')
      navigateTo('/')
    } else {
      const user = window.localStorage.getItem('loggedAppUser')
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <div className='navbar'>
      <Link to=''>Home</Link>
      {
          user
            ? <Link to='ManageMyAccount'>My Account</Link>
            : <Link to='SignIn'>Sign In</Link>
        }
    </div>
  )
}

export default Nav
