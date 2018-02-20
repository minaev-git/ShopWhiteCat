import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import transliterate from "global/transliterate";
import { bindActionCreators } from "redux";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import * as actionsSubCategoryLink from "redux/modules/category/subCategoryLink";

class BreadCrumbSubCategory extends Component {

  componentDidMount() {
    this.props.actionsSubCategoryLink.getSubCategoryLink(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.actionsSubCategoryLink.getSubCategoryLink(this.props.match.params.id);
    }
  }

  render() {
    const subCategoryLink = this.props.subCategoryLink.entity;
    const isFetchingSubСategoryLink = this.props.subCategoryLink.isFetching;

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
    return isFetchingSubСategoryLink ? null : (
      <BreadCrumb breadCrumbLinks={breadCrumbLinksSubCategory} />
    );
  }
}

function mapStateToProps(state) {
  return {
    subCategoryLink: state.subCategoryLink
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsSubCategoryLink: bindActionCreators(actionsSubCategoryLink, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BreadCrumbSubCategory)
);
