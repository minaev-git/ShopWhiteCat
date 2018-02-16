// @flow
import React from "react";
import { Link } from "react-router-dom";
import transliterate from "global/transliterate";
import styles from "./productBox.css";

type Props = {
  name: string,
  price: number,
  salePrice: number
};

const ProductBox = (props: Props) => (
  <div className={styles.productBox}>
    <Link
      to={`/product/${transliterate(props.product.name)}/${props.product.id}`}
    >
      <h3>{props.product.name}</h3>
      <div>
        <img
          src={JSON.parse(props.product.images)[0]}
          alt={props.product.name}
        />
      </div>
      <p className={styles.salePrice}>{props.product.sale_price}р</p>
      <p>{props.product.price}р</p>
    </Link>
    <button>Купить</button>
  </div>
);

export default ProductBox;
