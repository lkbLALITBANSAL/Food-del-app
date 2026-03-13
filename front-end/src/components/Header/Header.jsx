import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">

      <div className="header-content">

        <h2>Order your favourite food</h2>

        <p>
          Discover the best meals from top restaurants. Fresh ingredients,
          amazing flavors, and fast delivery right at your doorstep.
        </p>

        <div className="header-buttons">

          <a href="#explore-menu">
            <button className="primary-btn">Explore Menu</button>
          </a>

          <a href="#explore-menu">
            <button className="secondary-btn">Order Now</button>
          </a>

        </div>

      </div>

    </div>
  );
};

export default Header;