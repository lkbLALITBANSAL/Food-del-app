import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setshowLogin }) => {

  const [menu, setmenu] = useState("Home");

  const { getTotalAmount, token, settoken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    navigate("/");
  };

  return (
    <div className="navbar-wrapper">

      <div className="navbar">

        <Link to={"/"}>
          <img src={assets.logo} alt="" className="main-logo" />
        </Link>

        <ul className="navbar-menu">
          <Link to={"/"} onClick={()=>setmenu("Home")} className={menu==="Home"?"Active":""}>Home</Link>
          <a href="#explore-menu" onClick={()=>setmenu("Menu")} className={menu==="Menu"?"Active":""}>Menu</a>
          <a href="#app-mobile" onClick={()=>setmenu("Mobile")} className={menu==="Mobile"?"Active":""}>Mobile App</a>
          <a href="#footer" onClick={()=>setmenu("Contact")} className={menu==="Contact"?"Active":""}>Contact</a>
        </ul>

        <div className="navbar-right">

          {/* CART */}
          <div className="cart-btn">
            <Link to={"/cart"}>
              <img src={assets.cart} alt="" />
            </Link>
            <div className={getTotalAmount()===0 ? "" : "dot"}></div>
          </div>

          {!token ? (
            <button className="signin-btn" onClick={()=>setshowLogin(true)}>
              Sign In
            </button>
          ) : (

            <div className="navbar-profile">

              <img src={assets.profile} alt="" />

              <ul className="nav-profile-dropdown">

                <li onClick={()=>navigate('/myorders')}>
                  <img src={assets.orders} alt="" />
                  <p>Orders</p>
                </li>

                <hr/>

                <li onClick={logout}>
                  <img src={assets.logout} alt="" />
                  <p>Logout</p>
                </li>

              </ul>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Navbar;