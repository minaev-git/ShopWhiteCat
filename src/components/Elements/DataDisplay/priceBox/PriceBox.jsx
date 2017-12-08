// @flow
import React from "react";
import styles from "./priceBox.css";

type Props = {
  status: string,
  price: number,
  salePrice: number
}

const PriceBox = (props: Props) => (
  <div className={styles.priceBox}>
    <p className={props.status === "sale" ? styles.sale : styles.price}>
      <span>{props.salePrice} р</span>
      {props.price} р
    </p>
  </div>
);

export default PriceBox;
