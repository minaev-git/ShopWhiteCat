// @flow
import React from "react";
import type { Product } from "type/product";
import sendProduct from "hoc/sendProduct";
import Select from "components/Elements/DataEntry/select/Select";
import Option from "components/Elements/DataEntry/select/Option";
import ColorRadio from "components/Elements/DataEntry/colorRadio/ColorRadio";
import PriceBox from "components/Elements/DataDisplay/priceBox/PriceBox";
import styles from "./productForm.css";

type Props = {
  product: Product,
  status: string,
  price: number,
  salePrice: number,
  changeProduct: Function,
  onSubmit: Function,
  onChangeChildProduct: Function,
  onChangeColor: Function
};

const ProductForm = (props: Props) => {
  const { child_products = [], colors = [], seo_description } = props.product;

  const childProducts = child_products.map(childProduct => (
    <Option
      onClick={props.changeProduct(childProduct)}
      key={childProduct.id}
      id={childProduct.id}
      value={childProduct.name}
    />
  ));

  let selectTitle = null;

  if (child_products.length >= 1) {
    selectTitle = (
      <p className={`hiddenDesktop ${styles.titleSelect}`}>
        Выбрать комплектацию:
      </p>
    );
  }

  return (
    <form className={styles.productForm} onSubmit={props.onSubmit}>
      <div className="hiddenMobile">
        <p>Характеристики:</p>
        <p className={styles.specification}>
          {seo_description}
        </p>
      </div>
      {selectTitle}
      <Select className={styles.select} onChange={props.onChangeChildProduct}>
        {childProducts}
      </Select>
      <ColorRadio
        className={styles.colorRadio}
        colors={colors}
        onChangeColor={props.onChangeColor}
      />
      <div className={styles.sendProduct}>
        <PriceBox
          className={{ priceBox: styles.priceBox, sale: styles.sale }}
          status={props.status}
          price={props.price}
          salePrice={props.salePrice}
        />
        <button type="submit">Добавить в корзину</button>
      </div>
    </form>
  );
};

export default sendProduct(ProductForm);
