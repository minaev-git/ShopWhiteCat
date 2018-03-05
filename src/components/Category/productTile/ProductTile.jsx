// @flow
import React, { Component } from "react";
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
  onChangeColor: Function,
  getCount: Function
};

class ProductTile extends Component<Props> {

  render() {
    const childProducts: Array<Element<any>> = this.props.product.child_products.map(
      childProduct => (
        <Option
          onClick={this.props.changeProduct(childProduct)}
          key={childProduct.id}
          id={childProduct.id}
          value={childProduct.name}
        />
      )
    );

    return (
      <div
        className={`${styles.productTile} ${
          this.props.status === "sale" ? styles.sale : ""
        }`}
      >
        <Link
          to={`/product/${transliterate(this.props.product.name)}/${
            this.props.product.id
          }`}
        >
          <img src={JSON.parse(this.props.product.images)[0]} alt="Тестики" />
        </Link>
        <form onSubmit={this.props.onSubmit}>
          <img src={this.props.product.brand} alt="тест" />
          <Link
            to={`/product/${transliterate(this.props.product.name)}/${
              this.props.product.id
            }`}
          >
            <h3>{this.props.product.name}</h3>
          </Link>
          <Select onChange={this.props.onChangeChildProduct}>{childProducts}</Select>
          <p>{this.props.product.seo_description}</p>
          <div className={styles.bottomElement}>
            <ColorRadio
              className={styles.colorRadio}
              colors={this.props.product.colors}
              onChangeColor={this.props.onChangeColor}
            />
            <PriceBox
              status={this.props.status}
              salePrice={this.props.salePrice}
              price={this.props.price}
            />
            <Popover>
              <button type="submit">
                Купить
              </button>
            </Popover>
          </div>
        </form>
      </div>
    );
  }
}



export default sendProduct(ProductTile)

