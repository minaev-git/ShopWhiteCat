import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MobileMiniNav from "components/Elements/Navigation/mobileMiniNav/MobileMiniNav";
import * as actionsSubCategoryLink from "redux/modules/category/subCategoryLink";

class MobileMiniNavSubCategory extends Component {
  componentDidMount() {
    this.props.actionsSubCategoryLink.getSubCategoryLink(
      this.props.match.params.id
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.actionsSubCategoryLink.getSubCategoryLink(
        this.props.match.params.id
      );
    }
  }

  render() {
    const subCategoryLink = this.props.subCategoryLink.entity;
    const isFetchingSubСategoryLink = this.props.subCategoryLink.isFetching;

    return isFetchingSubСategoryLink ? null : (
      <MobileMiniNav categories={subCategoryLink} type="childCategory" />
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
  connect(mapStateToProps, mapDispatchToProps)(MobileMiniNavSubCategory)
);
