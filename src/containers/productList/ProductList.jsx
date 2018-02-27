import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import transliterate from "global/transliterate";
import ProductTile from "components/Category/productTile/ProductTile";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import { getCount } from 'redux/modules/cart/getCount';
import * as actionsCategory from "redux/modules/category/category";
import * as actionsProduct from "redux/modules/product";
import * as actionsCategoryLink from "redux/modules/category/categoryLink";
import styles from "./productList.css";

class ProductList extends Component {
  state = {
    sort: null
  };

  componentDidMount() {
    this.props.actionsCategory.getCategory(this.props.match.params.id);
    this.props.actionsCategoryLink.getCategoryLink(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.actionsCategory.getCategory(this.props.match.params.id);
      this.props.actionsCategoryLink.getCategoryLink(
        this.props.match.params.id
      );
      this.sortProducts(null);
    }
  }

  sortProducts = typeSort => {
    this.props.actionsCategory.getCategory(
      this.props.match.params.id,
      typeSort
    );
    this.setState(() => ({
      sort: typeSort
    }));
  };

  render() {
    const category = this.props.category.entity;
    const isFetchingCategory = this.props.category.isFetching;
    const categoryLink = this.props.categoryLink.entity;
    const isFetchingСategoryLink = this.props.categoryLink.isFetching;

    const productsBlock = (category.products || []).map(product => (
      <ProductTile
        product={product}
        key={product.id}
        addProduct={this.props.actionsProduct.addProduct}
        getCount={this.props.getCount}
      />
    ));

    const breadCrumbLinksCategory = isFetchingСategoryLink
      ? null
      : [
          {
            name: categoryLink.name,
            link: `/category/mainCategory/${transliterate(categoryLink.name)}/${
              categoryLink.id
            }`
          }
        ];

    if (isFetchingCategory || isFetchingСategoryLink) {
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
            <BreadCrumb breadCrumbLinks={breadCrumbLinksCategory} />
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
    category: state.category,
    categoryLink: state.categoryLink
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategory: bindActionCreators(actionsCategory, dispatch),
    actionsProduct: bindActionCreators(actionsProduct, dispatch),
    actionsCategoryLink: bindActionCreators(actionsCategoryLink, dispatch),
    getCount: bindActionCreators(getCount, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);
