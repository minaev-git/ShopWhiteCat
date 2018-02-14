// @flow
import React from "react";
import type { Element } from "react";
import { Link } from "react-router-dom";
import type { Product } from "type/product";
import transliterate from "global/transliterate";
import sendProduct from "hoc/sendProduct";
import Select from "components/Elements/DataEntry/select/Select";
import Option from "components/Elements/DataEntry/select/Option";
import ColorRadio from "components/Elements/DataEntry/colorRadio/ColorRadio";
import PriceBox from "components/Elements/DataDisplay/priceBox/PriceBox";
import Popover from "components/Elements/DataDisplay/popover/Popover";
import styles from "./productTile.css";

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

const ProductTile = (props: Props) => {
  const childProducts: Array<Element<any>> = props.product.child_products.map(
    childProduct => (
      <Option
        onClick={props.changeProduct(childProduct)}
        key={childProduct.id}
        id={childProduct.id}
        value={childProduct.name}
      />
    )
  );

  return (
    <div
      className={`${styles.productTile} ${
        props.status === "sale" ? styles.sale : ""
      }`}
    >
      <Link
        to={`/product/${transliterate(props.product.name)}/${props.product.id}`}
      >
        <img src={JSON.parse(props.product.images)[0]} alt="Тестики" />
      </Link>
      <form onSubmit={props.onSubmit}>
        <img src={props.product.brand} alt="тест" />
        <Link
          to={`/product/${transliterate(props.product.name)}/${
            props.product.id
          }`}
        >
          <h3>{props.product.name}</h3>
        </Link>
        <Select onChange={props.onChangeChildProduct}>{childProducts}</Select>
        <p>{props.product.seo_description}</p>
        <div className={styles.bottomElement}>
          <ColorRadio
            className={styles.colorRadio}
            colors={props.product.colors}
            onChangeColor={props.onChangeColor}
          />
          <PriceBox
            status={props.status}
            salePrice={props.salePrice}
            price={props.price}
          />
          <Popover>
            <button type="submit">Купить</button>
          </Popover>
        </div>
      </form>
    </div>
  );
};

export default sendProduct(ProductTile);
