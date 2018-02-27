import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getCartProducts } from "redux/modules/cart/getCartProducts";
import { getTotalPrice } from "redux/modules/cart/getTotalPrice";
import ProductCard from "components/CartPage/productCard/ProductCard";
import MobileDropDown from "components/Elements/DataDisplay/mobileDropDown/MobileDropDown";
import TotalBlock from "components/CartPage/totalBlock/TotalBlock";
import CheckOutForm from "containers/checkOutForm/CheckOutForm";
import ModalPortal from "components/Elements/Portal/ModalPortal";
import cartIcon from "./cart.jpg";
import styles from "./cartPage.css";

class CartPage extends Component {
  state = {
    checkOutFormShow: false
  };

  componentDidMount() {
    this.props.getCartProducts();
    this.props.getTotalPrice();
  }

  componentWillUnmount() {
    this.props.getCartProducts();
    this.props.getTotalPrice();
  }

  handleShowCheckOutForm = () => {
    this.setState(prevState => ({
      checkOutFormShow: !prevState.checkOutFormShow
    }));
  };

  render() {
    if (this.props.cartProducts.isFetcing) {
      return null;
    }

    let emptyCart = null;
    if (this.props.count.entity === 0) {
      emptyCart = (
        <div className={styles.emptyCart}>
          <p>
            Корзина пустует,{" "}
            <Link to="/category/mainCategory/salfetki/25">
              перейти к покупкам
            </Link>
          </p>
          <Link to="/category/mainCategory/salfetki/25">
            <img src={cartIcon} alt="Корзина" />
          </Link>
        </div>
      );
    }

    const products = (this.props.cartProducts.entity.products || []).map(
      product => (
        <ProductCard product={product} reloadCount={this.reloadCount} />
      )
    );

    return (
      <div>
        <div className={styles.title}>
          <h2>Корзина</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.cartPage}>
          <div className={styles.productList}>
            {emptyCart}
            {products}
            {/*<ProductCard product={{name: 'швабра', images: [''], child: {name: '20x20'}, color: {hex: 'red'}, price: 2000, count: 2}} reloadCount={this.reloadCount} />*/}
          </div>
          {this.props.count.entity > 0 ? (
            <TotalBlock
              handleShowCheckOutForm={this.handleShowCheckOutForm}
              totalPrice={this.props.totalPrice.entity}
            />
          ) : null}
          <div className={`hiddenDesktop`}>
            <div className={styles.line} />
            <MobileDropDown title="Москва" text={"Рома жирный и некрасивый"} />
            <MobileDropDown title="Воронеж" text={"Рома жирный и некрасивый"} />
            <MobileDropDown title="Блабла" text={"Рома жирный и некрасивый"} />
          </div>
          <ModalPortal>
            <CheckOutForm
              checkOutFormShow={this.state.checkOutFormShow}
              handleShowCheckOutForm={this.handleShowCheckOutForm}
            />
          </ModalPortal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartProducts: state.cart.cartProducts,
    totalPrice: state.cart.totalPrice,
    count: state.cart.count
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
