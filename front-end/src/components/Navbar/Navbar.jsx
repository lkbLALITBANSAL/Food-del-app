import React, { useContext } from 'react'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setshowLogin}) => {
    const [menu, setmenu] = useState("menu");
    const {getTotalAmount,token,settoken}=useContext(StoreContext)

    const navigate=useNavigate()

    const logout=()=>{
      localStorage.removeItem("token");
      settoken("")
      navigate('/')
    }
  return (
    <div className='navbar'>

    <Link to={'/'}> <img src={assets.logo} alt="" width={200} height={60} className='main-logo'/></Link> 

      <ul className="navbar-menu">
        <Link to={'/'} onClick={()=>{setmenu("Home")}} className={menu=="Home"?"Active":""}>Home</Link>
        <a   href='#explore-menu'   onClick={()=>{setmenu("menu")}} className={menu=="menu"?"Active":""}>menu</a>
        <a   href='#app-mobile'   onClick={()=>{setmenu("mobile-app")}} className={menu=="mobile-app"?"Active":""}>mobile-app</a>
        <a   href='#footer'   onClick={()=>{setmenu("Contact-us")}} className={menu=="Contact-us"?"Active":""}>Contact us</a>
      </ul>

      <div className="navbar-right">
        {/* <img src={assets.search} alt="" width={20} /> */}

        <div className="navbar-search-icon">
           <Link to={'/cart'}> <img src={assets.cart} alt="" width={30}/></Link> 
            {/* show dot when there is something add in basket  */}
           <div className={getTotalAmount()===0 ?"":"dot"}></div>
        </div>

       {!token ?<button onClick={()=>setshowLogin(true)}>Sign in</button>:
        <div className='navbar-profile'>
          <img width={40} src={assets.profile} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>{navigate('/myorders')}}><img width={20} src={assets.orders} alt="" /><p>orders</p></li>
            <hr/>
            <li onClick={logout}> <img width={20} src={assets.logout} alt="" /> <p>logout</p></li>
          </ul>
        </div> } 
      </div>
      
    </div>
  )
}

export default Navbar
