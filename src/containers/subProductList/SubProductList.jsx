import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProductTile from "components/Category/productTile/ProductTile";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import * as actionsSubCategory from "redux/modules/category/subCategory";
import * as actionsProduct from "redux/modules/product";
import styles from "./SubProductList.css";

class ProductList extends Component {
  state = {
    sort: null
  };

  componentDidMount() {
    this.props.actionsSubCategory.getSubCategory(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.actionsSubCategory.getSubCategory(this.props.match.params.id);
    }
  }

  sortProducts = typeSort => {
    this.props.actionsSubCategory.getSubCategory(
      this.props.match.params.id,
      typeSort
    );
    this.setState(() => ({
      sort: typeSort
    }));
  };

  render() {
    const category = this.props.subCategory.entity;
    const isFetchingCategory = this.props.subCategory.isFetching;

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
            <BreadCrumb breadCrumbLinks={this.props.breadCrumbLinks} />
          </div>
          <div className={styles.sort}>
            <p>сортировать:</p>
            <button
              className={this.state.sort === "price" ? styles.activeSort : ""}
              onClick={() => this.sortProducts("price")}
            >
              по цене
            </button>
            <button
              className={this.state.sort === "novelty" ? styles.activeSort : ""}
              onClick={() => this.sortProducts("novelty")}
            >
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
    subCategory: state.subCategory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsSubCategory: bindActionCreators(actionsSubCategory, dispatch),
    actionsProduct: bindActionCreators(actionsProduct, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
