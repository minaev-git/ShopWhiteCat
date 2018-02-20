import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MobileMiniNav from "components/Elements/Navigation/mobileMiniNav/MobileMiniNav";
import * as actionsCategoryLink from "redux/modules/category/categoryLink";

class MobileMiniNavCategory extends Component {
  
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

    return isFetchingСategoryLink ? null : (
      <MobileMiniNav categories={categoryLink} type="category" />
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
  connect(mapStateToProps, mapDispatchToProps)(MobileMiniNavCategory)
);
