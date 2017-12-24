// @flow
import React from "react";
import styles from "./priceBox.css";

type Props = {
  status: string,
  price: number,
  salePrice: number,
};


const PriceBox = (props: Props) => (
  <div className={`${styles.priceBox} ${props.className.priceBox}`}>
    <p
      className={
        props.status === "sale"
          ? `${styles.sale} ${props.className.sale}`
          : styles.price
      }
    >
      <span>{props.salePrice} р</span>
      {props.price} р
    </p>
  </div>
);

PriceBox.defaultProps = {
  className: {
    priceBox: '',
    sale: ''
  }
};

export default PriceBox;
