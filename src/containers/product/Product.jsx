import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./product.css";
import Spinner from "components/Elements/Feedback/spinner/Spinner"
import ProductCard from "components/Product/productCard/ProductCard";
import * as productsActions from "actions/productsActions";

class Product extends Component {

  componentDidMount() {
    this.props.productsActions.getProduct(this.props.match.params.id);
  }

  render() {
    const { product = {} , loadingProduct } = this.props.products;

    if(loadingProduct) {
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
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productsActions: bindActionCreators(productsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
