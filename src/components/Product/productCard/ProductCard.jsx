// @flow
import React from "react";
import type { Product } from "type/product";
import PhotoSlider from "components/Elements/DataDisplay/photoSlider/PhotoSlider";
import MobileDropDown from "components/Elements/DataDisplay/mobileDropDown/MobileDropDown";
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
      <ProductPhoto photos={props.product.images} />
    </div>
    <div className={`hiddenDesktop ${styles.mobileSlider}`}>
      <PhotoSlider photos={props.product.images} />
    </div>
    <ProductForm product={props.product} />
    <div className={`hiddenDesktop ${styles.mobileSlider}`}>
      <MobileDropDown title="Характеристики" text={props.product.seo_description} />
    </div>
    <ProductDescription product={props.product} />
  </div>
);

export default ProductCard;
