// @flow
import React from "react";
import { Link } from "react-router-dom";
import styles from "./productBox.css";
import test from "./test.png";

type Props = {
  name: string,
  price: number, 
  salePrice: number
}

const ProductBox = (props: Props) => (
  <div className={styles.productBox}>
    <Link to="/">
      <h3>{props.name}</h3>
      <div>
        <img src={test} alt="ееее" />
      </div>
      <p className={styles.salePrice}>{props.salePrice}р</p>
      <p>{props.price}р</p>
    </Link>
    <button>Купить</button>
  </div>
);

export default ProductBox;
// <img src={JSON.parse(state.images)[0]} alt={state.name}/>
