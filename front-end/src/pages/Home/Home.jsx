import React from 'react'
import { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import Fooddisplay from '../../components/Fooddisplay/Fooddisplay'
import Appmobile from '../../components/Appmobile/Appmobile'

const Home = () => {
  const [category, setcategory] = useState("All")
  return (
    <div className='home'>
      
      {/* <video width={1000} height={500}  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/delicious-food-banner-template-design-cd3994e39458960f4f33e73b8c60edb9_screen.mp4?ts=1645769305"  autoPlay muted loop></video> */}
      
      <Header/>
      <Exploremenu category={category}  setcategory={setcategory}/>
      <Fooddisplay category={category}/>
      <Appmobile/>      
    </div>
  )
}

export default Home
