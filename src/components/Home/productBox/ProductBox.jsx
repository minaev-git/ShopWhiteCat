// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import transliterate from "global/transliterate";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionsProduct from "redux/modules/product";
import { getCount } from "redux/modules/cart/getCount";
import styles from "./productBox.css";

type Props = {
  name: string,
  price: number,
  salePrice: number
};

class ProductBox extends Component<Props> {
  state = {
    inCartLink: false
  };

  addProductToCart = async () => {
    await this.props.actionsProduct.addProduct({
      id: this.props.product.id
    });
    this.props.getCount();
    this.setState(prevState => ({
      inCartLink: !prevState.inCartLink
    }));
  };

  render() {
    return (
      <div
        itemScope
        itemType="http://schema.org/Offer"
        className={styles.productBox}
      >
        <Link
          to={`/product/${transliterate(this.props.product.name)}/${
            this.props.product.id
          }`}
        >
          <h3 itemProp="name">{this.props.product.name}</h3>
          <div>
            <img
              itemProp="image"
              src={JSON.parse(this.props.product.images)[0]}
              alt={this.props.product.name}
            />
          </div>
          <p className={styles.salePrice} itemProp="price">
            {this.props.product.sale_price}₽
          </p>
          <p>{this.props.product.price}₽</p>
        </Link>
        {this.state.inCartLink ? (
          <Link className={styles.inCartLink} to="/cart">
            Перейти в корзину
          </Link>
        ) : (
          <button onClick={this.addProductToCart}>Добавить в корзину</button>
        )}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actionsProduct: bindActionCreators(actionsProduct, dispatch),
    getCount: bindActionCreators(getCount, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductBox);
