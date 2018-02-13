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
    const type="childCategory"
    const { categories = [] } = this.props.categories.entity;
    const isFetchingCategories = this.props.categories.isFetching;
    const categoryLink = this.props.subCategoryLink.entity;
    const isFetchingСategoryLink = this.props.subCategoryLink.isFetching;
    const subCategory = this.props.subCategory.entity;
    const isFetchingSubCategory = this.props.subCategory.isFetching;

    const breadCrumbLinks = isFetchingSubCategory
      ? null
      : [
          {
            name: subCategory.category.name,
            link: `/category/${transliterate(subCategory.category.name)}/${
              subCategory.category.id
            }`
          },
          {
            name: subCategory.name,
            link: `/subcategory/${transliterate(subCategory.name)}/${
              subCategory.id
            }`
          }
        ];

    const miniNavMenu = isFetchingSubCategory ? null : (
      <BreadCrumb breadCrumbLinks={breadCrumbLinks} />
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
          <SubProductList
            breadCrumbLinks={breadCrumbLinks}
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
    subCategoryLink: state.subCategoryLink,
    categories: state.categories,
    subCategory: state.subCategory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategories: bindActionCreators(actionsCategories, dispatch),
    actionsSubCategoryLink: bindActionCreators(
      actionsSubCategoryLink,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
