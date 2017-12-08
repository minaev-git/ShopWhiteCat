// @flow
import React from "react";
import type { Product } from 'type/product';
import styles from "./productCard.css";
import ProductPhoto from "../productPhoto/ProductPhoto";
import ProductForm from "../productForm/ProductForm";

type Props = {
  product: Product
}

const ProductCard = (props: Props)=> (
  <div className={styles.productCard}>
    <ProductPhoto />
    <ProductForm product={props.product} />
  </div>
);

export default ProductCard;
