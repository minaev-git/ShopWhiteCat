// @flow
import { bindActionCreators } from "redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCount } from "redux/modules/cart/getCount";
import styles from "./cart.css";
import cart from "./cart.svg";

class Cart extends Component {
  componentDidMount() {
    this.props.getCount();
  }
  render() {
    return (
      <div className="col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2">
        <Link to="/cart">
          <div className={styles.cart}>
            <img src={cart} alt="Корзина" />
            <p>{this.props.count.entity}</p>
          </div>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.cart.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCount: bindActionCreators(getCount, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
