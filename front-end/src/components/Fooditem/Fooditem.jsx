import React, { useContext, useState } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Fooditem = ({ id, name, description, price, image }) => {
  // const [itemCount, setItemCount] = useState(0) 
  const {carditem,addtocart,Removefromcart,url}=useContext(StoreContext)

  return (
    <div className='food-item'>

      <div className="food-item-img-container">
        <img className='food-item-image' src={url+'/images/'+image} alt={name} />

        {!carditem[id]? (
          <img width={30}
            className='circle-plus'
            src={assets.white_circle_plus}
            alt="add"
            onClick={() =>addtocart(id)}
          />
        ) : (
          <div className="counter">
            <img width={30} 
              src={assets.circle_minus}
              alt="remove"
              onClick={() =>Removefromcart(id)}
            />

            <span>{carditem[id]}</span>

            <img width={30}
              src={assets.circle_plus}
              alt="add"
              onClick={() => addtocart(id)}
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <p className="food-item-name"><b>{name}</b></p>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>₹{price}</p>
      </div>

    </div>
  )
}

export default Fooditem
