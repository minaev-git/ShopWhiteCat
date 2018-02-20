import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import transliterate from "global/transliterate";
import { bindActionCreators } from "redux";
import BreadCrumb from "components/Elements/Navigation/breadcrumb/BreadCrumb";
import * as actionsCategoryLink from "redux/modules/category/categoryLink";

class BreadCrumbCategory extends Component {

  componentDidMount() {
    this.props.actionsCategoryLink.getCategoryLink(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.actionsCategoryLink.getCategoryLink(this.props.match.params.id);
    }
  }

  render() {
    const categoryLink = this.props.categoryLink.entity;
    const isFetchingСategoryLink = this.props.categoryLink.isFetching;

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

    return isFetchingСategoryLink ? null : (
      <BreadCrumb breadCrumbLinks={breadCrumbLinksCategory} />
    );
  }
}

function mapStateToProps(state) {
  return {
    categoryLink: state.categoryLink
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsCategoryLink: bindActionCreators(actionsCategoryLink, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BreadCrumbCategory)
);
