import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCartProducts } from "redux/modules/cart/getCartProducts";
import ProductCard from "components/CartPage/productCard/ProductCard";
import TotalBlock from "components/CartPage/totalBlock/TotalBlock";
import styles from "./cartPage.css";

class CartPage extends Component {
  componentDidMount() {
    this.props.getCartProducts();
  }
  render() {
    if (this.props.cartProducts.isFetching) {
      return null;
    }

    let emptyCart = null;

    if (this.props.cartProducts.entity.products.length === 0) {
      emptyCart = <p>Корзина пустует, Милорд</p>;
    }

    const products = this.props.cartProducts.entity.products.map(product => {
      return <ProductCard product={product} />;
    });

    return (
      <div className={styles.cartPage}>
        <div className={styles.productList}>
          {emptyCart}
          <ProductCard />
          <ProductCard />
          <ProductCard />
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
