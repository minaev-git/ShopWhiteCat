import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import prodAddress from "redux/prodAddress";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeToCart } from "redux/modules/cart/removeToCart";
import * as actionsAddToCart from "redux/modules/cart/addToCart";
import * as actionsMinusProductToCart from "redux/modules/cart/minusProductToCart";
import styles from "./productCount.css";

class ProductCount extends Component {
  state = {
    count: this.props.product.count || "",
    error: ""
  };

  componentDidMount() {
    this.setState(() => ({
      count: this.props.product.count
    }));
  }

  addToCart = event => {
    axios({
      method: "post",
      url: `${prodAddress}/api/addCart`,
      data: {
        id: this.props.product.id,
        color: this.props.product.color.id,
        child: this.props.product.child.id
      }
    })
      .then(response => {
        this.setState(() => ({
          count: response.data
        }));
        this.props.reloadPrice(response.data);
      })
      .catch(errorRequest => {
        this.setState(() => ({
          error: errorRequest.message
        }));
      });
    event.preventDefault();
  };

  minusProductToCart = event => {
    axios({
      method: "post",
      url: `${prodAddress}/api/minusCart`,
      data: {
        id: this.props.product.id,
        color: this.props.product.color.id,
        child: this.props.product.child.id
      }
    })
      .then(response => {
        this.setState(() => ({
          count: response.data
        }));
        this.props.reloadPrice(response.data);
      })
      .catch(errorRequest => {
        this.setState(() => ({
          error: errorRequest.message
        }));
      });
    event.preventDefault();
  };

  render() {
    return (
      <span className={styles.productCount}>
        <button onClick={this.minusProductToCart}>-</button>
        <p>{this.state.count}</p>
        <button onClick={this.addToCart}>+</button>
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
    actionsRemoveToCart: bindActionCreators(removeToCart, dispatch),
    actionsAddToCart: bindActionCreators(actionsAddToCart, dispatch),
    actionsMinusProductToCart: bindActionCreators(
      actionsMinusProductToCart,
      dispatch
    )
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCount)
);
