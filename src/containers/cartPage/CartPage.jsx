import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getCartProducts } from "redux/modules/cart/getCartProducts";
import ProductCard from "components/CartPage/productCard/ProductCard";
import TotalBlock from "components/CartPage/totalBlock/TotalBlock";
import styles from "./cartPage.css";

class CartPage extends Component {
  componentDidMount() {
    this.props.getCartProducts();
  }
  
  componentWillUnmount() {
    this.props.getCartProducts();
  }

  render() {
    if (this.props.cartProducts.isFetcing) {
      return null;
    }

    let emptyCart = null;
    if (!this.props.cartProducts.entity.products) {
      emptyCart = <p>Корзина пустует, Милорд</p>;
    }

    const products = (this.props.cartProducts.entity.products || []).map(
      product => (
        <ProductCard product={product} reloadCount={this.reloadCount} />
      )
    );

    return (
      <div className={styles.cartPage}>
        <div className={styles.productList}>
          {emptyCart}
          {products}
        </div>
        <TotalBlock totalPrice={this.props.cartProducts.entity.totalPrice} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartProducts: state.cart.cartProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCartProducts: bindActionCreators(getCartProducts, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartPage)
);
