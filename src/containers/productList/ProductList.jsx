import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductTile from "components/Category/productTile/ProductTile";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import * as actionsCategory from "redux/modules/category/category";
import * as actionsProduct from "redux/modules/product";
import styles from "./productList.css";

class ProductList extends Component {
  constructor(props, context) {
    super(props, context);
    this.sortProducts = this.sortProducts.bind(this);
  }

  componentDidMount() {
    this.props.actionsCategory.getCategory(this.props.idActiveCategory);
  }

  componentDidUpdate(prevProps) {
    if (this.props.idActiveCategory !== prevProps.idActiveCategory) {
      this.props.actionsCategory.getCategory(this.props.idActiveCategory);
    }
  }

  sortProducts(typeSort) {
    switch (typeSort) {
      case "novelty":
        this.props.actionsCategory.getCategory(this.props.idActiveCategory);
        break;
      case "price":
        this.props.actionsCategory.getCategory(
          this.props.idActiveCategory,
          typeSort
        );
        break;
      default:
        return null;
    }
    return null;
  }

  render() {
    const category = this.props.category.entity;
    const isFetchingCategory = this.props.category.isFetching;

    const productsBlock = (category.products || []).map(product => (
      <ProductTile
        product={product}
        key={product.id}
        addProduct={this.props.actionsProduct.addProduct}
      />
    ));

    if (isFetchingCategory) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className="col-xl-9 col-lg-9 col-md-9">
        <div className={styles.productList}>
          <h2>
            {category.name}
            <span className={styles.counterProduct}>
              {category.count} товар
            </span>{" "}
          </h2>
          <div className={styles.miniNav}>
            <BreadCrumb
              breadCrumbLinks={this.props.breadCrumbLinks}
            />
          </div>
          <div className={styles.sort}>
            <p>сортировать:</p>
            <button onClick={() => this.sortProducts("price")}>по цене</button>
            <button onClick={() => this.sortProducts("novelty")}>
              по новинкам
            </button>
          </div>
          {productsBlock}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    category: state.category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategory: bindActionCreators(actionsCategory, dispatch),
    actionsProduct: bindActionCreators(actionsProduct, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
