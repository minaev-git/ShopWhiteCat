import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCartProducts } from "redux/modules/cart/getCartProducts"
import ProductCard from "components/CartPage/productCard/ProductCard";
import TotalBlock from "components/CartPage/totalBlock/TotalBlock";
import styles from "./cartPage.css"

class CartPage extends Component {

  componentDidMount() {
    this.props.getCartProducts();
  }
  render() {

    if(this.props.cartProducts.isFetching){
      return null
    }

    return (
      <div className={styles.cartPage}>
        <div className={styles.productList}>
          <ProductCard products={this.props.cartProducts.entity.products} />
          <ProductCard products={this.props.cartProducts.entity.products} />
          <ProductCard products={this.props.cartProducts.entity.products} />
        </div>
        <TotalBlock />
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