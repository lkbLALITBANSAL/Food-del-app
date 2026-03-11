import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { assets } from './assets/assets'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { useState } from 'react'
import Myorders from './pages/Myorders/Myorders'

const App = () => {
  const [showLogin, setshowLogin] = useState(false)

  return (
    <>
    {showLogin && <LoginPopup setshowLogin={setshowLogin}/>}
    <div className='app'>
          <Navbar setshowLogin={setshowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<Myorders/>}/>
      </Routes>
    </div>
      <Footer/>
</>
  )
}

export default App
