// @flow
import React from 'react';
import type { Element } from 'react';
import { Link } from "react-router-dom";
import type { Product } from 'type/product';
import transliterate from "global/transliterate";
import sendProduct from "hoc/sendProduct";
import Select from "components/Elements/DataEntry/select/Select";
import Option from "components/Elements/DataEntry/select/Option";
import ColorRadio from "components/Elements/DataEntry/colorRadio/ColorRadio";
import PriceBox from "components/Elements/DataDisplay/priceBox/PriceBox";
import styles from "./productTile.css";
import testLogo from "./testLogo.png";
import testProduct from "./testProduct.png";

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
  const childProducts: Array<Element<any>> = props.product.child_products.map(childProduct => (
    <Option
      onClick={props.changeProduct(childProduct)}
      key={childProduct.id}
      id={childProduct.id}
      value={childProduct.name}
    />
  ));

  return (
    <div className={styles.productTile}>
      <Link
        to={`/product/${transliterate(props.product.name)}/${props.product.id}`}
      >
        <img src={JSON.parse(props.product.images)[0]} alt="Тестики" />
      </Link>
      <form onSubmit={props.onSubmit}>
        <img src={testLogo} alt="тест" />
        <Link
          to={`/product/${transliterate(props.product.name)}/${props.product
            .id}`}
        >
          <h3>{props.product.name}</h3>
        </Link>
        <Select onChange={props.onChangeChildProduct}>{childProducts}</Select>
        <p>{props.product.seo_description}</p>
        <div className={styles.bottomElement}>
          <ColorRadio
            colors={props.product.colors}
            onChangeColor={props.onChangeColor}
          />
          <PriceBox
            status={props.status}
            salePrice={props.salePrice}
            price={props.price}
          />
          <button type="submit">Купить</button>
        </div>
      </form>
    </div>
  );
};

export default sendProduct(ProductTile);
