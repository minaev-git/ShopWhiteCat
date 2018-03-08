import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import transliterate from "global/transliterate";
import styles from "./mobileMenu.css";
import menu from "./menu.svg";
import close from "./close.svg";
import back from "./back.svg";

export default class MobileMenu extends Component {

  state = {
    isOpenMenu: false,
    isOpenCatalog: false
  }

  handleAll = () => {
    this.handleMenu();
    this.handleCatalog();
  };

  handleMenu = () => {
    this.setState(prevState => ({ isOpenMenu: !prevState.isOpenMenu }));
  }

  handleCatalog = () => {
    this.setState(prevState => ({ isOpenCatalog: !prevState.isOpenCatalog }));
  }

  render() {
    const categories = this.props.categories.map(category => (
      <Link
        to={`/category/mainCategory/${transliterate(category.name)}/${category.id}`}
        onClick={this.handleAll}
        key={category.id}
      >
        {category.name}
      </Link>
    ));

    return (
      <div className="col-sm-2 col-2 hiddenDesktop">
        <div className={styles.mobileMenu}>
          <button onClick={this.handleMenu}>
            <img src={menu} alt="Меню" />
          </button>
          <div
            className={styles.hiddenMenu}
            style={{ display: this.state.isOpenMenu ? "block" : "none" }}
          >
            <button className={styles.closeMenu} onClick={this.handleMenu}>
              <img src={close} alt="Закрыть" />
            </button>
            <button onClick={this.handleCatalog}>
              <p>Каталог товаров</p>
              <p>&gt;</p>
            </button>
            <Link to="/delivery" onClick={this.handleMenu}>
              Доставка и оплата
            </Link>
            <Link to="/gift" onClick={this.handleMenu}>Подарки</Link>
            <Link to="/contacts" onClick={this.handleMenu}>Контакты</Link>
          </div>
          <div
            className={`${styles.hiddenMenu} ${styles.catalog}`}
            style={{ display: this.state.isOpenCatalog ? "block" : "none" }}
          >
            <button className={styles.back} onClick={this.handleCatalog}>
              <img src={back} alt="Закрыть" />
            </button>
            <button className={styles.closeMenu} onClick={this.handleAll}>
              <img src={close} alt="Закрыть" />
            </button>
            {categories}
          </div>
        </div>
      </div>
    );
  }
};
