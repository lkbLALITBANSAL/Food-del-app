import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img width={150} src={assets.logo} alt="" className="logo" />
      <div className="profile-image"></div>
    </div>
  )
}

export default Navbar
