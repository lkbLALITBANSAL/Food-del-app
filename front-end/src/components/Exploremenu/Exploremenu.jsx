import React from 'react'
import './Exploremenu.css'
import { menulist } from '../../assets/assets'

const Exploremenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p>
        Discover a variety of delicious food curated just for you
      </p>

      <div className="explore-menu-list">
        {menulist.map((item, index) => (
          <div onClick={()=>setcategory(prev=>prev===item.menu_category? "All":item.menu_category)} key={index} className='explore-menu-list-item'>
            <div className="card">
              <img className={category===item.menu_category ?"active":""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          </div>
        ))}
      </div>

      <hr />
    </div>
  )
}

export default Exploremenu
