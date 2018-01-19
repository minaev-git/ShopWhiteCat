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
import * as actionsSubCategoryLink from "redux/modules/category/subCategoryLink";
import SubProductList from "../subProductList/SubProductList";
import styles from "./SubCategory.css";

type Props = {
  categories: Category[]
};

class CategoryPage extends Component<Props> {
  componentDidMount() {
    this.props.actionsCategories.getCategories();
    this.props.actionsSubCategoryLink.getSubCategoryLink(
      this.props.match.params.id
    );
  }

  render() {
    const { categories = [] } = this.props.categories.entity;
    const isFetchingCategories = this.props.categories.isFetching;
    const categoryLink = this.props.subCategoryLink.entity;
    const isFetchingСategoryLink = this.props.subCategoryLink.isFetching;

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
          <SubProductList
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
    subCategoryLink: state.subCategoryLink,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategories: bindActionCreators(actionsCategories, dispatch),
    actionsSubCategoryLink: bindActionCreators(actionsSubCategoryLink, dispatch)
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
