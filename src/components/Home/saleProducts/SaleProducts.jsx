// @flow
import React from "react";
import type { Product } from 'type/product';
import styles from "./saleProducts.css";
import ProductBox from "../productBox/ProductBox";

type Props = {
  saleProducts: Product[]
}

const SaleProduct = (props: Props) => {
  const saleProducts = props.saleProducts.map(saleProduct => (
    <ProductBox
      name={saleProduct.name}
      price={saleProduct.price}
      salePrice={saleProduct.sale_price}
      images={saleProduct.images}
      key={saleProduct.id}
    />
  ));
  return (
    <div className="row">
      <div className={styles.saleProducts}>{saleProducts}</div>
    </div>
  );
};

export default SaleProduct;
