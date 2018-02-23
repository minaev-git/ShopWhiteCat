import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeToCart } from "redux/modules/cart/removeToCart";
import PriceBox from "components/Elements/DataDisplay/priceBox/PriceBox";
import ProductCount from "../productCount/ProductCount";
import styles from "./productCard.css";
import testImg from "./miniPhoto1.png";

class ProductCard extends Component {
  state = {
    hideProduct: false,
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

  removeProduct = () => {
    this.props.removeToCart(this.state.product);
    this.setState(prevState => ({
      hideProduct: !prevState.hideProduct
    }));
  };

  render() {
    if (this.state.hideProduct) {
      return null;
    }

    let color = {};

    if (this.props.product.color.hasOwnProperty('hex')) {
      color = {
        backgroundColor: this.props.product.color.hex
      };
    }

    return (
      <div className={styles.productCard}>
        <div className={styles.photo}>
          <img
            src={JSON.parse(this.props.product.images)[0]}
            alt={this.props.product.name}
          />
          <div className={styles.color} style={color} />
        </div>
        <p>
          {`${this.props.product.name} `}
          <span className={styles.childName}>
            {this.props.product.child.name}
          </span>
          <ProductCount
            reloadPrice={this.reloadPrice}
            product={this.props.product}
          />
        </p>
        <PriceBox
          className={{
            priceBox: styles.priceBox,
            price: styles.price,
            sale: styles.sale
          }}
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
    removeToCart: bindActionCreators(removeToCart, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
