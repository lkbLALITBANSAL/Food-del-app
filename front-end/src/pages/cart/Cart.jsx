
import React, { useContext, useState } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ setshowLogin }) => {
  const {
    carditem,
    food_list,
    addtocart,
    Removefromcart,
    getTotalAmount,
    url,
    token,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");

  const handleCheckout = () => {
    if (!token) {
      setLoginMessage("Please log in to continue with checkout.");
      setshowLogin(true);
      return;
    }

    if (getTotalAmount() === 0) {
      setLoginMessage("Your cart is empty. Add some food before checkout.");
      return;
    }

    setLoginMessage("");
    navigate("/order");
  };

  const subtotal = getTotalAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

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
        </div>

        <hr />

        {food_list.map((item) => {
          const quantity = carditem[item._id] || 0;

          if (quantity <= 0) return null;

          return (
            <React.Fragment key={item._id}>
              <div className="card_item_title card_items_item">
                <img
                  src={`${url}/images/${item.image}`}
                  alt={item.name}
                />

                <p className="cart-item-name">{item.name}</p>

                <p className="cart-item-price">
                  ${item.price}
                </p>

                <div className="quantity-control">
                  <button
                    type="button"
                    className="quantity-btn minus-btn"
                    onClick={() => Removefromcart(item._id)}
                    disabled={quantity <= 0}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span className="quantity-number">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    className="quantity-btn plus-btn"
                    onClick={() => addtocart(item._id)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-total">
                  ${(item.price * quantity).toFixed(2)}
                </p>
              </div>

              <hr />
            </React.Fragment>
          );
        })}

        {subtotal === 0 && (
          <p className="empty-cart">
            Your cart is empty. Add some delicious food!
          </p>
        )}
      </div>

      <div className="cart-bottem">
        <div className="cart-total">
          <h2>Cart total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>

            <hr />

            <div className="cart-total-details final-total">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
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

              <button type="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
