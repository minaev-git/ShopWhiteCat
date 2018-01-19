import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeToCart } from "redux/modules/cart/removeToCart";
import styles from "./productCount.css";

class ProductCount extends Component {
  render() {
    return (
      <span className={styles.productCount}>
        <button>-</button>
        <p>5</p>
        <button>+</button>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeToCart: bindActionCreators(removeToCart, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCount);
