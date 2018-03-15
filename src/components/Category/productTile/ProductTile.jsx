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
import testImg from "./miniPhoto1.png";

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

class ProductTile extends Component<Props> {
  render() {
    const childProducts: Array<
      Element<any>
    > = this.props.product.child_products.map(childProduct => (
      <Option
        onClick={this.props.changeProduct(childProduct)}
        key={childProduct.id}
        id={childProduct.id}
        value={childProduct.name}
      />
    ));

    return (
      <div
        itemScope
        itemType="http://schema.org/Offer"
        className={`${styles.productTile} ${
          this.props.status === "sale" ? styles.sale : ""
        }`}
      >
        <div className={styles.imgContainer}>
          <Link
            to={`/product/${transliterate(this.props.product.name)}/${
              this.props.product.id
            }`}
            className={styles.imgLink}
          >
            <img
              itemProp="image"
              src={JSON.parse(this.props.product.images)[0]}
              alt={this.props.product.name}
            />
          </Link>
        </div>
        <form onSubmit={this.props.onSubmit}>
          <img src={this.props.product.brand} alt={this.props.product.name} />
          <Link
            to={`/product/${transliterate(this.props.product.name)}/${
              this.props.product.id
            }`}
          >
            <h3 itemProp="name">{this.props.product.name}</h3>
          </Link>
          <Select onChange={this.props.onChangeChildProduct}>
            {childProducts}
          </Select>
          <p>{this.props.product.seo_description}</p>
          <div className={styles.bottomElement}>
            <ColorRadio
              className={styles.colorRadio}
              colors={this.props.product.colors}
              onChangeColor={this.props.onChangeColor}
            />
            <PriceBox
              className={{ priceBox: styles.priceBox }}
              status={this.props.status}
              salePrice={this.props.salePrice}
              price={this.props.price}
            />
            {this.props.inCartButton ? (
              <Link className={styles.linkToCart} to="/cart">
                Перейти в корзину
              </Link>
            ) : (
              <button type="submit">Купить</button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default sendProduct(ProductTile);
