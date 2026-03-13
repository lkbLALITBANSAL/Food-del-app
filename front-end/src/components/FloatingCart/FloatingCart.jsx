import React, { useContext } from "react";
import "./FloatingCart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingCart = () => {

  const { getTotalAmount, carditem } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const itemCount = Object.values(carditem).reduce((a, b) => a + b, 0);

  /* Hide if no items */
  if (itemCount === 0) return null;

  /* Show ONLY on homepage */
  if (location.pathname !== "/") return null;

  return (
    <div className="floating-cart" onClick={() => navigate("/cart")}>
      <span>{itemCount} item(s)</span>
      <span>₹{getTotalAmount()}</span>
      <button>View Cart →</button>
    </div>
  );
};

export default FloatingCart;