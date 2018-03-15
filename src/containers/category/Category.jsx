// @flow
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import type { Category } from "type/category";
import BreadCrumbCategory from "components/Category/breadCrumbCategory/BreadCrumbCategory";
import BreadCrumbSubCategory from "components/Category/breadCrumbSubCategory/BreadCrumbSubCategory";
import NavMenu from "components/Category/navMenu/NavMenu";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import MobileMiniNavCategory from "components/Category/mobileMiniNavCategory/MobileMiniNavCategory";
import MobileMiniNavSubCategory from "components/Category/mobileMiniNavSubCategory/MobileMiniNavSubCategory";
import * as actionsCategories from "redux/modules/category/categories";
import ProductList from "../productList/ProductList";
import SubProductList from "../subProductList/SubProductList";
import SearchList from "../searchList/SearchList";
import styles from "./Category.css";

type Props = {
  categories: Category[]
};

class CategoryPage extends Component<Props> {
  componentDidMount() {
    this.props.actionsCategories.getCategories();
    window.scrollTo(0, 0);
  }

  render() {
    const { categories = [] } = this.props.categories.entity;
    const isFetchingCategories = this.props.categories.isFetching;

    if (isFetchingCategories) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className={`fluid-container ${styles.category}`}>
        <div className={`row hiddenDesktop ${styles.mobileNavChild}`}>
          <Route
            path="/category/mainCategory/:name/:id"
            component={MobileMiniNavCategory}
          />
          <Route
            path="/category/subCategory/:name/:id"
            component={MobileMiniNavSubCategory}
          />
        </div>
        <div className={`row hiddenMobile ${styles.miniNav}`}>
          <Route
            path="/category/mainCategory/:name/:id"
            component={BreadCrumbCategory}
          />
          <Route
            path="/category/subCategory/:name/:id"
            component={BreadCrumbSubCategory}
          />
        </div>
        <div className="row">
          <NavMenu categories={categories} />
          <Route
            path="/category/mainCategory/:name/:id"
            component={ProductList}
          />
          <Route
            path="/category/subCategory/:name/:id"
            component={SubProductList}
          />
          <Route path="/search/:searchValue" component={SearchList} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subCategoryLink: state.subCategoryLink,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategories: bindActionCreators(actionsCategories, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);
