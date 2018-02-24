import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getCartProducts } from "redux/modules/cart/getCartProducts";
import { getTotalPrice } from "redux/modules/cart/getTotalPrice";
import ProductCard from "components/CartPage/productCard/ProductCard";
import MobileDropDown from "components/Elements/DataDisplay/mobileDropDown/MobileDropDown";
import TotalBlock from "components/CartPage/totalBlock/TotalBlock";
import styles from "./cartPage.css";

class CartPage extends Component {
  componentDidMount() {
    this.props.getCartProducts();
    this.props.getTotalPrice();
  }

  componentWillUnmount() {
    this.props.getCartProducts();
    this.props.getTotalPrice();
  }

  render() {
    if (this.props.cartProducts.isFetcing) {
      return null;
    }

    let emptyCart = null;
    if (!this.props.cartProducts.entity.products) {
      emptyCart = <p>Корзина пустует, Милорд</p>;
    }

    const products = (this.props.cartProducts.entity.products || []).map(
      product => (
        <ProductCard product={product} reloadCount={this.reloadCount} />
      )
    );

    return (
      <div className={styles.cartPage}>
        <div className={styles.productList}>
          {emptyCart}
          {products}
          {/*<ProductCard product={{name: 'швабра', images: [''], child: {name: '20x20'}, color: {hex: 'red'}, price: 2000, count: 2}} reloadCount={this.reloadCount} />*/}
        </div>
        <TotalBlock totalPrice={this.props.totalPrice.entity} />
        <div className={`hiddenDesktop`}>
          <div className={styles.line} />
          <MobileDropDown title="Москва" text={"Рома жирный и некрасивый"}/>
          <MobileDropDown title="Воронеж" text={"Рома жирный и некрасивый"}/>
          <MobileDropDown title="Блабла" text={"Рома жирный и некрасивый"}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartProducts: state.cart.cartProducts,
    totalPrice: state.cart.totalPrice
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCartProducts: bindActionCreators(getCartProducts, dispatch),
    getTotalPrice: bindActionCreators(getTotalPrice, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartPage)
);
