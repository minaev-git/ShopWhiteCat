import React, { Component } from "react";
import axios from "axios";
import prodAddress from "redux/prodAddress";
import { getTotalPrice } from "redux/modules/cart/getTotalPrice";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCount } from 'redux/modules/cart/getCount';
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
        this.props.getTotalPrice();
        this.props.getCount();
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
        this.props.getTotalPrice();
        this.props.getCount();
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    getTotalPrice: bindActionCreators(getTotalPrice, dispatch),
    getCount: bindActionCreators(getCount, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCount);
