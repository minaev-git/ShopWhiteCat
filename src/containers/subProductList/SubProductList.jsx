import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import transliterate from "global/transliterate";
import ProductTile from "components/Category/productTile/ProductTile";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import { getCount } from 'redux/modules/cart/getCount';
import * as actionsSubCategory from "redux/modules/category/subCategory";
import * as actionsProduct from "redux/modules/product";
import * as actionsSubCategoryLink from "redux/modules/category/subCategoryLink";
import styles from "./SubProductList.css";

class ProductList extends Component {
  state = {
    sort: null
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actionsSubCategory.getSubCategory(this.props.match.params.id);
    this.props.actionsSubCategoryLink.getSubCategoryLink(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.actionsSubCategory.getSubCategory(this.props.match.params.id);
      this.props.actionsSubCategoryLink.getSubCategoryLink(this.props.match.params.id);
      this.sortProducts(null);
      window.scrollTo(0, 0);
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
    const subCategoryLink = this.props.subCategoryLink.entity;
    const isFetchingSubСategoryLink = this.props.subCategoryLink.isFetching;

    const productsBlock = (category.products || []).map(product => (
      <ProductTile
        product={product}
        key={product.id}
        addProduct={this.props.actionsProduct.addProduct}
        getCount={this.props.getCount}
      />
    ));

    const breadCrumbLinksSubCategory = isFetchingSubСategoryLink
    ? null
    : [
        {
          name: subCategoryLink.category.name,
          link: `/category/mainCategory/${transliterate(subCategoryLink.category.name)}/${
            subCategoryLink.category.id
          }`
        },
        {
          name: subCategoryLink.name,
          link: `/category/subCategory/${transliterate(subCategoryLink.name)}/${
            subCategoryLink.id
          }`
        }
      ];

    if (isFetchingCategory) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    document.title = `«Белый кот» — ${this.props.subCategoryLink.entity.name}`;

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
            <BreadCrumb breadCrumbLinks={breadCrumbLinksSubCategory} />
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
    subCategory: state.subCategory,
    subCategoryLink: state.subCategoryLink
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsSubCategory: bindActionCreators(actionsSubCategory, dispatch),
    actionsProduct: bindActionCreators(actionsProduct, dispatch),
    actionsSubCategoryLink: bindActionCreators(actionsSubCategoryLink, dispatch),
    getCount: bindActionCreators(getCount, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
