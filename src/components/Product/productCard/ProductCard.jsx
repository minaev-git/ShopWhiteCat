// @flow
import React from "react";
import type { Product } from "type/product";
import PhotoSlider from 'components/Elements/DataDisplay/photoSlider/PhotoSlider';
import styles from "./productCard.css";
import ProductPhoto from "../productPhoto/ProductPhoto";
import ProductForm from "../productForm/ProductForm";
import ProductDescription from "../productDescription/ProductDescription";

type Props = {
  product: Product
};

const ProductCard = (props: Props) => (
  <div className={styles.productCard}>
    <h2 className={styles.title}>{props.product.name}</h2>
    <div className="hiddenMobile">
      <ProductPhoto />
    </div>
    <div className={`hiddenDesktop ${styles.mobileSlider}`}>
      <PhotoSlider photos={props.product.images} />
    </div>
    <ProductForm product={props.product} />
    <ProductDescription product={props.product} />
  </div>
);

export default ProductCard;
