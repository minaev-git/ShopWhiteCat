import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./productList.css";
import ProductTile from "components/Category/productTile/ProductTile";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb"
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import * as categoriesActions from "actions/categoriesActions";
import * as productsActions from "actions/productsActions";

class ProductList extends Component {
  constructor(props, context) {
    super(props, context);
    this.sortProducts = this.sortProducts.bind(this);
  }
  
  componentWillMount() {
    if (this.props.type === "category") {
      this.props.categoriesActions.getCategory(this.props.idActiveCategory);
    }
    if (this.props.type === "childCategory") {
      this.props.categoriesActions.getSubCategory(this.props.idActiveCategory);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.type === "category" &&
      this.props.idActiveCategory !== prevProps.idActiveCategory
    ) {
      this.props.categoriesActions.getCategory(this.props.idActiveCategory);
    }
    if (
      this.props.type === "childCategory" &&
      this.props.idActiveCategory !== prevProps.idActiveCategory
    ) {
      this.props.categoriesActions.getSubCategory(this.props.idActiveCategory);
    }
  }

  sortProducts(typeSort) {
    switch (typeSort) {
      case "novelty":
        if (this.props.type === "category") {
          this.props.categoriesActions.getCategory(this.props.idActiveCategory);
        }
        if (this.props.type === "childCategory") {
          this.props.categoriesActions.getSubCategory(
            this.props.idActiveCategory
          );
        }
        break;
      case "price":
        if (this.props.type === "category") {
          this.props.categoriesActions.getCategory(
            this.props.idActiveCategory,
            typeSort
          );
        }
        if (this.props.type === "childCategory") {
          this.props.categoriesActions.getSubCategory(
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
    const { category = {}, loadingCategory } = this.props.categories;

    const productsBlock = (category.products || []).map(product => (
      <ProductTile
        product={product}
        key={product.id}
        addProduct={this.props.productsActions.addProduct}
      />
    ));

    if (loadingCategory) {
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
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch)
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
