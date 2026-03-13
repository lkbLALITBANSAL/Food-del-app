import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>

      <div className="navbar-left">
        <img src={assets.logo} alt="logo" className="logo" />
      </div>

      <div className="navbar-center">
        <h2>Welcome Admin 👋</h2>
        <p>Manage your food delivery dashboard</p>
      </div>

      <div className="navbar-right">
        <div className="profile-image">
          <img className='admin-photo' src={assets.user} alt="admin" />
        </div>
      </div>

    </div>
  )
}

export default Navbar