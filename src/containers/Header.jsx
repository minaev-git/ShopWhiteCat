import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logo from "components/Header/logo/Logo";
import Contacts from "components/Header/contacts/Contacts";
import Search from "components/Header/search/Search";
import Cart from "components/Header/cart/Cart";
import Info from "components/Header/info/Info";
import Menu from "components/Header/menu/Menu";
import MobileMenu from "components/Header/mobileMenu/MobileMenu";
import * as actionsCategories from "redux/modules/category/categories";
import styles from "./styles/Header.css";

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpenMenu: false,
      isOpenCatalog: false,
      isOpenSearch: false
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleCatalog = this.handleCatalog.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    this.props.actionsCategories.getCategories();
  }

  handleMenu() {
    this.setState(prevState => ({ isOpenMenu: !prevState.isOpenMenu }));
  }

  handleCatalog() {
    this.setState(prevState => ({ isOpenCatalog: !prevState.isOpenCatalog }));
  }

  handleSearch() {
    this.setState(prevState => ({ isOpenSearch: !prevState.isOpenSearch }));
  }

  render() {
    const { categories = [] } = this.props.categories.entity;
    const isFetching = this.props.categories.isFetching;

    if(isFetching) {
      return null
    }

    return (
      <header className="fluid-container">
        <div className="row">
          <div className={styles.mobile}>
            <MobileMenu
              categories={categories}
              handleMenu={this.handleMenu}
              handleCatalog={this.handleCatalog}
              isOpenMenu={this.state.isOpenMenu}
              isOpenCatalog={this.state.isOpenCatalog}
            />
            <Logo />
            <Contacts />
            <Search
              handleSearch={this.handleSearch}
              isOpen={this.state.isOpenSearch}
            />
            <Info />
            <Cart />
          </div>
        </div>
        <div className="row">
          <Menu categories={categories} />
        </div>
      </header>
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
    actionsCategories: bindActionCreators(actionsCategories, dispatch)
  }
}

Header.propTypes = {
  categories: PropTypes.shape({
    categories: PropTypes.array,
    loadingCategories: PropTypes.bool
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
