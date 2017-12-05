import React from "react";
import Main from "./Main";
import Header from "./Header";
import styles from "./styles/App.css";

const SaleProduct = () => (
  <div className={`container ${styles.mainFrame}`}>
    <Header />
    <Main />
  </div>
);

export default SaleProduct;
