import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

        <div className="footer-content-left">
          <img className="footer-logo" src={assets.logo} alt="" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dolorum expedita dolores rerum voluptates dolorem inventore.
          </p>
          <div className="social-icons">
            <img width={50} src={assets.facebook} alt="" />
            <img width={50} src={assets.twitter} alt="" />
            <img width={50} src={assets.linkedin} alt="" />
          </div>
        </div>

        <div className="footer-content-centre">
          <h2>company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get IN Touch</h2>
          <ul>
            <li>+1-2018-795-990</li>
            <li>Contact@EatZo.com</li>
          </ul>
        </div>

      </div>

      <hr />
      <p className="footer-copyright">
        Copyright 2026 @ EatZo.com | All Right Reserved
      </p>
    </div>
  )
}

export default Footer
