import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Auth } from '../../context/AuthContext';

const NavLinks = () => {
  let { user, logoutUser } = useContext(Auth);
  return (<header>
    <Logo />

    <div className='navbar'>

      <div className='navlink-container'>
        <Link to='/' className='textColor'>Home</Link>
        <div className="navlink-bar"></div>
      </div>
  

  
      
           
    
      
      {user ? (<button onClick={logoutUser}>Logout</button>) : (<div className='navlink-container'>
        <Link to='/login'> Login </Link>
        <div className="navlink-bar"></div>
      </div>)}
      {user ? "" : (<div className='navlink-container'>
        <Link to='/signup'> Signup </Link>
        <div className="navlink-bar"></div>
      </div>)}

    </div>
  </header>
  )
}

export default NavLinks
