// @flow
import React from "react";
import styles from "./priceBox.css";

type Props = {
  status: string,
  price: number,
  salePrice: number
};

const PriceBox = (props: Props) => {
  if (props.status === "sale") {
    return (
      <div className={`${styles.priceBox} ${props.className.priceBox}`}>
        <p className={`${styles.sale} ${props.className.sale}`}>
          {props.price} ₽
          <span itemProp="price">{props.salePrice} ₽</span>
        </p>
      </div>
    );
  }
  return (
    <div className={`${styles.priceBox} ${props.className.priceBox}`}>
      <p
        itemProp="price"
        className={`${styles.price} ${props.className.price}`}
      >
        {props.price} ₽
      </p>
    </div>
  );
};

PriceBox.defaultProps = {
  className: {
    priceBox: "",
    sale: "",
    price: ""
  }
};

export default PriceBox;
