// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
    if (this.props.type === "category") {
      this.props.actionsCategoryLink.getCategoryLink(
        this.props.match.params.id
      );
    }
    if (this.props.type === "childCategory") {
      this.props.actionsCategoryLink.getSubCategoryLink(
        this.props.match.params.id
      );
    }
  }

  render() {
    const { categories = {} } = this.props.categories.entity;
    const isFetchingCategories = this.props.categories.isFetching;

    const { categoryLink } = this.props.categoryLink.entity;
    const isFetchingСategoryLink = this.props.categoryLink.isFetching;

    const miniNavMenu = isFetchingСategoryLink ? null : (
      <BreadCrumb
        type={this.props.type}
        idActiveCategory={this.props.match.params.id}
        categoryNav={categoryLink}
      />
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
          <MobileMiniNav categories={categoryLink} type={this.props.type} />
        </div>
        <div className={`row hiddenMobile ${styles.miniNav}`}>
          {miniNavMenu}
        </div>
        <div className="row">
          <NavMenu categories={categories} />
          <ProductList
            type={this.props.type}
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
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategories: bindActionCreators(actionsCategories, dispatch),
    actionsCategoryLink: bindActionCreators(actionsCategoryLink, dispatch)
  };
}

CategoryPage.propTypes = {
  categories: PropTypes.shape({
    categoriesNav: PropTypes.array,
    categoryLink: PropTypes.object,
    loadingCategories: PropTypes.bool,
    loadingCategoryLink: PropTypes.bool
  }).isRequired,
  categoriesActions: PropTypes.shape({
    getCategories: PropTypes.func,
    getCategoryLink: PropTypes.func,
    getChildCategoryLink: PropTypes.func
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  type: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
