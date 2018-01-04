import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "redux/modules/cart/cart"
import PriceBox from "components/Elements/DataDisplay/priceBox/PriceBox";
import styles from "./productCard.css";
import testImg from "./miniPhoto1.png";

class ProductCard extends Component {
  render() {
    return (
      <div className={styles.productCard}>
        <img src={testImg} />
        <h4>Швабра для окон - Smart 125X29</h4>
        <PriceBox className={{priceBox: styles.price}} status="" price="545" salePrice="255"/>
        <button className={styles.delete}>Удалить</button>
      </div>
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
    cartActions: bindActionCreators(cartActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);