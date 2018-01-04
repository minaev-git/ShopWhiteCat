// @flow

import React from "react";
import { Link } from "react-router-dom";
import styles from "./cart.css";
import cart from "./cart.svg";

const Cart = () => (
  <div className="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2">
    <Link to="/cart">
      <div className={styles.cart}>
        <img src={cart} alt="Корзина" />
        <p>324</p>
      </div>
    </Link>
  </div>
);

export default Cart;
