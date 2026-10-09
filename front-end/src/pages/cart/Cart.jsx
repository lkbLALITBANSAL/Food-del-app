
import React, { useContext, useState } from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {
    carditem,
    food_list,
    Removefromcart,
    getTotalAmount,
    url,
    token,
    setShowLogin
  } = useContext(StoreContext)

  const navigate = useNavigate()
  const [loginMessage, setLoginMessage] = useState("")

  const handleCheckout = () => {
    if (!token) {
      setLoginMessage("Please log in to continue with checkout.")
      setShowLogin(true)
      return
    }

    if (getTotalAmount() === 0) {
      setLoginMessage("Your cart is empty. Add some food before checkout.")
      return
    }

    setLoginMessage("")
    navigate('/order')
  }

  return (
    <div className="cart">

      {loginMessage && (
        <p className="login-message" role="status">
          {loginMessage}
        </p>
      )}

      <div className="cart_items">
        <div className="card_item_title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item) => {
          if (carditem[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className="card_item_title card_items_item">
                  <img
                    src={url + '/images/' + item.image}
                    alt={item.name}
                  />

                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{carditem[item._id]}</p>
                  <p>{item.price * carditem[item._id]}</p>

                  <p onClick={() => Removefromcart(item._id)}>X</p>
                </div>

                <hr />
              </React.Fragment>
            )
          }

          return null
        })}
      </div>

      <div className="cart-bottem">
        <div className="cart-total">
          <h2>Cart total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalAmount() === 0 ? 0 : 2}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <p>
                {getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}
              </p>
            </div>
          </div>

          <button onClick={handleCheckout}>
            Proceed to checkout
          </button>
        </div>

        <div className="cart-promo">
          <div>
            <p>If you have a promo code, enter it here.</p>

            <div className="promo-code-enter">
              <input
                className="cart-promo-input"
                type="text"
                placeholder="Enter promo code"
              />

              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
