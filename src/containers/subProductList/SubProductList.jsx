import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProductTile from "components/Category/productTile/ProductTile";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import * as actionsSubCategory from "redux/modules/category/subCategory";
import * as actionsProduct from "redux/modules/product";
import styles from "./SubProductList.css";

class ProductList extends Component {
  constructor(props, context) {
    super(props, context);
    this.sortProducts = this.sortProducts.bind(this);
  }

  componentDidMount() {
    this.props.actionsSubCategory.getSubCategory(this.props.idActiveCategory);
  }

  componentDidUpdate(prevProps) {
    if (this.props.idActiveCategory !== prevProps.idActiveCategory) {
      this.props.actionsSubCategory.getSubCategory(this.props.idActiveCategory);
    }
  }

  sortProducts(typeSort) {
    switch (typeSort) {
      case "novelty":
        this.props.actionsSubCategory.getSubCategory(
          this.props.idActiveCategory
        );
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
            <BreadCrumb
              type={this.props.type}
              idActiveCategory={this.props.idActiveCategory}
              categoryNav={category}
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
    subCategory: state.subCategory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsSubCategory: bindActionCreators(actionsSubCategory, dispatch),
    actionsProduct: bindActionCreators(actionsProduct, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
