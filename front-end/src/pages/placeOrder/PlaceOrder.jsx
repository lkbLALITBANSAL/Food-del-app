
import React from 'react'
import './placeOrder.css'
import { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const PlaceOrder = () => {
  const {
    getTotalAmount,
    token,
    food_list,
    carditem,
    url,
    setShowLogin
  } = useContext(StoreContext)

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const [loginMessage, setLoginMessage] = useState("")

  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setdata(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const placeorder = async (e) => {
    e.preventDefault()

    // If the user is not logged in, open the login popup.
    if (!token) {
      setLoginMessage("Please log in to continue with your order.")
      setShowLogin(true)
      return
    }

    // Do not allow checkout with an empty cart.
    if (getTotalAmount() === 0) {
      navigate('/cart')
      return
    }

    try {
      const orderitems = []

      food_list.forEach((item) => {
        if (carditem[item._id] > 0) {
          orderitems.push({
            ...item,
            quantity: carditem[item._id]
          })
        }
      })

      const orderData = {
        address: data,
        items: orderitems,
        amount: getTotalAmount() + 2
      }

      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      )

      if (response.data.success) {
        const { session_url } = response.data
        window.location.replace(session_url)
      } else {
        alert("Unable to place order. Please try again.")
      }
    } catch (error) {
      console.error("Place order error:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={placeorder} className="place-order">

      {loginMessage && (
        <p className="login-message">
          {loginMessage}
        </p>
      )}

      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            name="firstname"
            value={data.firstname}
            onChange={onChangeHandler}
            type="text"
            placeholder="First name"
          />

          <input
            required
            name="lastname"
            value={data.lastname}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          required
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Enter email"
        />

        <input
          required
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
          />

          <input
            required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Zip code"
          />

          <input
            required
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
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
                {getTotalAmount() === 0
                  ? 0
                  : getTotalAmount() + 2}
              </p>
            </div>
          </div>

          <button type="submit">
            Proceed to Payment
          </button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
