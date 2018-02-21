import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCartProducts } from "redux/modules/cart/getCartProducts";
import { removeToCart } from "redux/modules/cart/removeToCart";
import PriceBox from "components/Elements/DataDisplay/priceBox/PriceBox";
import ProductCount from "../productCount/ProductCount";
import styles from "./productCard.css";
import testImg from "./miniPhoto1.png";

class ProductCard extends Component {
  state = {
    count: this.props.product.count || 1,
    product: {
      id: this.props.product.id,
      color: this.props.product.color.id,
      child: this.props.product.child.id
    }
  };

  reloadPrice = currentCount => {
    this.setState(() => ({
      count: currentCount
    }));
  };

  removeProduct = async () => {
    await this.props.removeToCart(this.state.product);
    console.log(this.props.removeToCart(this.state.product))
    this.props.getCartProducts();
  }

  render() {
    return (
      <div className={styles.productCard}>
        <img
          src={JSON.parse(this.props.product.images)[0]}
          alt={this.props.product.name}
        />
        <p>
          {this.props.product.name}
          <ProductCount
            reloadPrice={this.reloadPrice}
            product={this.props.product}
          />
        </p>
        <PriceBox
          className={{ priceBox: styles.price }}
          status=""
          price={this.props.product.price * this.state.count}
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
    remove: state.cart.remove
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCartProducts: bindActionCreators(getCartProducts, dispatch),
    removeToCart: bindActionCreators(removeToCart, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
