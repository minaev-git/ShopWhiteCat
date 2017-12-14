// @flow
import React from "react";
import type { Product } from 'type/product';
import styles from "./productDescription.css";

type Props = {
  product: Product
}

const ProductDescription = (props: Props) => (
  <div className={styles.productDescription}>
    <h3 className={styles.title}>О товаре</h3>
    <p className={styles.description}>{props.product.description}</p>
  </div>
)

export default ProductDescription;