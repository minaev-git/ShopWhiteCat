// @flow
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import type { Category } from "type/category"
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import NavMenu from "components/Category/navMenu/NavMenu";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import MobileMiniNav from "components/Elements/Navigation/mobileMiniNav/MobileMiniNav";
import * as categoriesActions from "actions/categoriesActions";
import ProductList from "../productList/ProductList";
import styles from "./Category.css";

type Props = {
  categories: Category[]
}

class CategoryPage extends Component<Props> {
  componentDidMount() {
    this.props.categoriesActions.getCategories();
    if (this.props.type === "category") {
      this.props.categoriesActions.getCategoryLink(this.props.match.params.id);
    }
    if (this.props.type === "childCategory") {
      this.props.categoriesActions.getChildCategoryLink(
        this.props.match.params.id
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.type === "category" &&
      this.props.match.params.id !== prevProps.match.params.id
    ) {
      this.props.categoriesActions.getCategoryLink(this.props.match.params.id);
    }
    if (
      this.props.type === "childCategory" &&
      this.props.match.params.id !== prevProps.match.params.id
    ) {
      this.props.categoriesActions.getChildCategoryLink(
        this.props.match.params.id
      );
    }
  }

  render() {
    const {
      categoriesNav = [],
      categoryLink = {},
      loadingCategories,
      loadingCategoryLink
    } = this.props.categories;

    const miniNavMenu = loadingCategoryLink ? null : (
      <BreadCrumb
        type={this.props.type}
        idActiveCategory={this.props.match.params.id}
        categoryNav={categoryLink}
      />
    );

    if (loadingCategories && loadingCategoryLink) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className="fluid-container">
        <div className={`row hiddenDesktop ${styles.mobileNavChild}`}>
          <MobileMiniNav
            categories={categoryLink.child_categories}
            type={"subcategory"}
          />
        </div>
        <div className={`row hiddenMobile ${styles.miniNav}`}>
          {miniNavMenu}
        </div>
        <div className="row">
          <NavMenu categories={categoriesNav} />
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
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoriesActions: bindActionCreators(categoriesActions, dispatch)
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
