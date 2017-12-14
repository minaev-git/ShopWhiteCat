import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "components/Elements/Feedback/spinner/Spinner"
import ProductCard from "components/Product/productCard/ProductCard";
import * as actionsProduct from "redux/modules/product";
import styles from "./product.css";

class Product extends Component {

  componentDidMount() {
    this.props.actionsProduct.getProduct(this.props.match.params.id);
  }

  render() {
    const { product = {} } = this.props.product.entity;
    const isFetchingGetProduct = this.props.product.isFetching; 

    if(isFetchingGetProduct) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )
    }
    
    return (
      <div>
        <ProductCard product={product} />
      </div>
    );
  }
}

Product.propTypes = {
  products: PropTypes.shape({
    product: PropTypes.object
  }).isRequired,
  productsActions: PropTypes.shape({
    getProduct: PropTypes.func
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

function mapStateToProps(state) {
  return {
    product: state.product
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsProduct: bindActionCreators(actionsProduct, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);
