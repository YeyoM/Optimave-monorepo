import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='Header-section'>
      <header>Welcome to Optimave</header>
      <p><small> The ultimate booster for your PC, let the power of your machine flow through the games.</small></p>
      <Link to='/SignUp'>Buy Now</Link>
      <a href='https://discord.gg/'>Join our Discord</a>

    </div>
  )
}

export default Header
