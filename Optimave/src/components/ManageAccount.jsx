import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ManageAccount = ({ handleLogout }) => {
  const navigateTo = useNavigate()

  const [key, setKey] = useState('')
  const [username, setUsername] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!window.localStorage.getItem('loggedAppUser')) {
      navigateTo('/')
    } else {
      const user = window.localStorage.getItem('loggedAppUser')
      setKey(JSON.parse(user).key)
      // setUsername(JSON.parse(user).name)
    }
  }, [])

  const toggleKey = () => {
    setShow(!show)
  }

  return (
    <div className='manage-container'>
      <div className='manage-card'>
        <h1>My key</h1>
        <input type={show ? 'text' : 'password'} value={key} readOnly />
        <button className='show-hide' onClick={toggleKey}>Hide / Show</button>
        <h4>Need help?</h4>
        <p>Contact with our team via discord</p>
        <p>Or send us an e-mail!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default ManageAccount
