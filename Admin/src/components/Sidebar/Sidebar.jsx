import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
    
            <NavLink to={'/add'} className="sidebar-option">
                <img width={40} src={assets.plus} alt="" />
                <p>Add items</p>
            </NavLink>
            <NavLink to={'/list'} className="sidebar-option">
                <img width={40} src={assets.list} alt="" />
                <p>List items</p>
            </NavLink>
            <NavLink to={'/orders'} className="sidebar-option">
                <img width={40} src={assets.list} alt="" />
                <p>orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
