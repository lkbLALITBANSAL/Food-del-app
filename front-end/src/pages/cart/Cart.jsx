import React, { useContext } from 'react'
import './cart.css'
import {StoreContext} from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {carditem,food_list,Removefromcart,getTotalAmount,url,token}=useContext(StoreContext)

  const navigate=useNavigate();

  const handleCheckout = () => {
  if(!token){
    alert("Please login to proceed to payment");
    return;
  }

  navigate('/order');
}

  return (
    <div className='cart'>
       <div className="cart_items">
            <div className="card_item_title">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br/>
            <hr/>
           {food_list.map((item,index)=>{
               if(carditem[item._id]>0){
                return (
                  <>
                  <div className="card_item_title card_items_item">
                    <img src={url+'/images/'+item.image} alt="" />
                   <p>{item.name}</p>
                   <p>${item.price}</p>
                   <p>{carditem[item._id]}</p>
                   <p>{item.price*carditem[item._id]}</p>
                    <p onClick={()=>Removefromcart(item._id)}>X</p>
                  </div>
                  <hr/>
                  </>
                )
               }
           })}
       </div>
       <div className="cart-bottem">
        <div  className="cart-total">
          <h2>Cart total</h2>
          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalAmount()}</p>
            </div>
<hr/>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalAmount()===0?0:2}</p>
            </div>
<hr/>
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalAmount()===0?0:getTotalAmount()+2}</p>
            </div>
        </div>
         <button onClick={handleCheckout}>Proceed to checkout</button>
            </div>
       
        <div className="cart-promo">
          <div>
            <p>if you have promo code , then enter it here</p>
            <div className="promo-code-enter">
              <input className='cart-promo-input' type="text" placeholder='Enter promocode'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Cart
 