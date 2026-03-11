import React from 'react'
import './Appmobile.css'
import { assets } from '../../assets/assets'

const Appmobile = () => {
  return (
    <div className='app-mobile' id='app-mobile'>
        <div>
          <p>For Better Experience Download</p>
          <p>EatZo app</p>
        </div>
      
      <div className="app-download-plateform">
        <img className='img1' width={170} src={assets.mobileapp1} alt="" />
        <img className='img2' width={170} src={assets.mobileapp2} alt="" />
      </div>
    </div>
  )
}

export default Appmobile
