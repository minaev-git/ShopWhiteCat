import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeToCart } from "redux/modules/cart/removeToCart";
import PriceBox from "components/Elements/DataDisplay/priceBox/PriceBox";
import ProductCount from "../productCount/ProductCount";
import styles from "./productCard.css";
import testImg from "./miniPhoto1.png";

class ProductCard extends Component {
  removeProduct = () => {
    console.log(1);
    const paramsProduct = {};
    this.props.removeToCart(this.props.product);
  };

  render() {
    return (
      <div className={styles.productCard}>
        <img src={testImg} />
        <h4>
          Новая супер тест швабра X5000<ProductCount />
        </h4>
        <PriceBox
          className={{ priceBox: styles.price }}
          status=""
          price={125}
          salePrice="255"
        />
        <button onClick={this.removeProduct} className={styles.delete}>
          Удалить
        </button>
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
    removeToCart: bindActionCreators(removeToCart, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
