// @flow
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import transliterate from "global/transliterate";
import { bindActionCreators } from "redux";
import type { Category } from "type/category";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import NavMenu from "components/Category/navMenu/NavMenu";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import MobileMiniNav from "components/Elements/Navigation/mobileMiniNav/MobileMiniNav";
import * as actionsCategories from "redux/modules/category/categories";
import * as actionsCategoryLink from "redux/modules/category/categoryLink";
import * as actionsSubCategoryLink from "redux/modules/category/subCategoryLink";
import ProductList from "../productList/ProductList";
import SubProductList from "../subProductList/SubProductList";
import styles from "./Category.css";

type Props = {
  categories: Category[]
};

class CategoryPage extends Component<Props> {
  componentDidMount() {
    this.props.actionsCategories.getCategories();
    this.props.actionsCategoryLink.getCategoryLink(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.actionsCategoryLink.getCategoryLink(
        this.props.match.params.id
      );
    }
  }

  render() {
    const { categories = [] } = this.props.categories.entity;
    const isFetchingCategories = this.props.categories.isFetching;
    const categoryLink = this.props.categoryLink.entity;
    const isFetchingСategoryLink = this.props.categoryLink.isFetching;
    const subCategoryLink = this.props.subCategoryLink.entity;
    const isFetchingSubСategoryLink = this.props.subCategoryLink.isFetching;

    const breadCrumbLinksCategory = isFetchingСategoryLink
      ? null
      : [
          {
            name: categoryLink.name,
            link: `/category/mainCategory/${transliterate(categoryLink.name)}/${categoryLink.id}`
          }
        ];

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

    const miniNavMenu = isFetchingСategoryLink ? null : (
      <BreadCrumb breadCrumbLinks={breadCrumbLinksCategory} />
    );

    if (isFetchingCategories || isFetchingСategoryLink) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className="fluid-container">
        <div className={`row hiddenDesktop ${styles.mobileNavChild}`}>
          <MobileMiniNav categories={categoryLink} type={'category'} />
        </div>
        <div className={`row hiddenMobile ${styles.miniNav}`}>
          {miniNavMenu}
        </div>
        <div className="row">
          <NavMenu categories={categories} />
          <Route
            path="/category/:name/:id/mainCategory/"
            render={() => (
              <ProductList type="category" breadCrumbLinks={breadCrumbLinksCategory} />
            )}
          />
          <Route
            path="/category/:name/:id/subCategory/"
            render={() => (
              <SubProductList
                type="childCategory"
                breadCrumbLinks={breadCrumbLinksSubCategory}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categoryLink: state.categoryLink,
    subCategoryLink: state.subCategoryLink,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategories: bindActionCreators(actionsCategories, dispatch),
    actionsCategoryLink: bindActionCreators(actionsCategoryLink, dispatch),
    actionsSubCategoryLink: bindActionCreators(actionsSubCategoryLink, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
);
