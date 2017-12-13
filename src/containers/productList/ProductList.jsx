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
    if (this.props.type === "category") {
      this.props.actionsCategory.getCategory(this.props.idActiveCategory);
    }
    if (this.props.type === "childCategory") {
      this.props.actionsCategory.getSubCategory(this.props.idActiveCategory);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.type === "category" &&
      this.props.idActiveCategory !== prevProps.idActiveCategory
    ) {
      this.props.actionsCategory.getCategory(this.props.idActiveCategory);
    }
    if (
      this.props.type === "childCategory" &&
      this.props.idActiveCategory !== prevProps.idActiveCategory
    ) {
      this.props.actionsCategory.getSubCategory(this.props.idActiveCategory);
    }
  }

  sortProducts(typeSort) {
    switch (typeSort) {
      case "novelty":
        if (this.props.type === "category") {
          this.props.actionsCategory.getCategory(this.props.idActiveCategory);
        }
        if (this.props.type === "childCategory") {
          this.props.actionsCategory.getSubCategory(
            this.props.idActiveCategory
          );
        }
        break;
      case "price":
        if (this.props.type === "category") {
          this.props.actionsCategory.getCategory(
            this.props.idActiveCategory,
            typeSort
          );
        }
        if (this.props.type === "childCategory") {
          this.props.actionsCategory.getSubCategory(
            this.props.idActiveCategory,
            typeSort
          );
        }
        break;
      default:
        return null;
    }
    return null;
  }

  render() {
    const { category = { products: [] } } = this.props.category.entity;
    const isFetchingCategories = this.props.category.isFetching;

    const productsBlock = category.products.map(product => (
      <ProductTile
        product={product}
        key={product.id}
        addProduct={this.props.actionsProduct.addProduct}
      />
    ));

    if (isFetchingCategories) {
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
    category: state.category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategory: bindActionCreators(actionsCategory, dispatch),
    actionsProduct: bindActionCreators(actionsProduct, dispatch)
  };
}

ProductList.propTypes = {
  categories: PropTypes.shape({
    category: PropTypes.object,
    loadingCategory: PropTypes.bool
  }).isRequired,
  categoriesActions: PropTypes.shape({
    getCategory: PropTypes.func,
    getSubCategory: PropTypes.func
  }).isRequired,
  productsActions: PropTypes.shape({
    addProduct: PropTypes.func
  }).isRequired,
  type: PropTypes.string.isRequired,
  idActiveCategory: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
