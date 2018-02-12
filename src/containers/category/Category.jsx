// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import transliterate from "global/transliterate";
import { bindActionCreators } from "redux";
import type { Category } from "type/category";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import NavMenu from "components/Category/navMenu/NavMenu";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import MobileMiniNav from "components/Elements/Navigation/mobileMiniNav/MobileMiniNav";
import * as actionsCategories from "redux/modules/category/categories";
import * as actionsCategoryLink from "redux/modules/category/categoryLink";
import ProductList from "../productList/ProductList";
import styles from "./Category.css";

type Props = {
  categories: Category[]
};

class CategoryPage extends Component<Props> {
  componentDidMount() {
    this.props.actionsCategories.getCategories();
    this.props.actionsCategoryLink.getCategoryLink(this.props.match.params.id);
  }

  render() {
    const type="category";
    const { categories = [] } = this.props.categories.entity;
    const isFetchingCategories = this.props.categories.isFetching;
    const categoryLink = this.props.categoryLink.entity;
    const isFetchingСategoryLink = this.props.categoryLink.isFetching;
    const category = this.props.category.entity;
    const isFetchingCategory = this.props.category.isFetching;

    const breadCrumbLinks = isFetchingCategory
      ? null
      : [
          {
            name: category.name,
            link: `/category/${transliterate(category.name)}/${category.id}`
          }
        ];

    const miniNavMenu = isFetchingCategory ? null : (
      <BreadCrumb linkArr={breadCrumbLinks} />
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
          <MobileMiniNav categories={categoryLink} type={type} />
        </div>
        <div className={`row hiddenMobile ${styles.miniNav}`}>
          {miniNavMenu}
        </div>
        <div className="row">
          <NavMenu categories={categories} />
          <ProductList
            type={type}
            idActiveCategory={this.props.match.params.id}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categoryLink: state.categoryLink,
    categories: state.categories,
    category: state.category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategories: bindActionCreators(actionsCategories, dispatch),
    actionsCategoryLink: bindActionCreators(actionsCategoryLink, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
