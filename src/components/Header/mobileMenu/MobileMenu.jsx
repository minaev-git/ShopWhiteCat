import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import transliterate from "global/transliterate";
import styles from "./mobileMenu.css";
import menu from "./menu.svg";
import close from "./close.svg";
import back from "./back.svg";

const MobileMenu = state => {
  const closeAll = () => {
    state.handleMenu();
    state.handleCatalog();
  };

  const categories = state.categories.map(category => (
    <Link
      to={`/Category/${transliterate(category.name)}/${category.id}`}
      onClick={closeAll}
      key={category.id}
    >
      {category.name}
    </Link>
  ));

  return (
    <div className="col-sm-2 col-2 hiddenDesktop">
      <div className={styles.mobileMenu}>
        <button onClick={state.handleMenu}>
          <img src={menu} alt="Меню" />
        </button>
        <div
          className={styles.hiddenMenu}
          style={{ display: state.isOpenMenu ? "block" : "none" }}
        >
          <button className={styles.closeMenu} onClick={state.handleMenu}>
            <img src={close} alt="Закрыть" />
          </button>
          <button onClick={state.handleCatalog}>
            <p>Каталог товаров</p>
            <p>&gt;</p>
          </button>
          <Link to="/Category" onClick={state.handleMenu}>
            Доставка и оплата
          </Link>
          <Link to="/">Доставка и оплата</Link>
          <Link to="/">Подарки</Link>
          <Link to="/">Доставка и оплата</Link>
        </div>
        <div
          className={`${styles.hiddenMenu} ${styles.catalog}`}
          style={{ display: state.isOpenCatalog ? "block" : "none" }}
        >
          <button className={styles.back} onClick={state.handleCatalog}>
            <img src={back} alt="Закрыть" />
          </button>
          <button className={styles.closeMenu} onClick={closeAll}>
            <img src={close} alt="Закрыть" />
          </button>
          {categories}
        </div>
      </div>
    </div>
  );
};

//Исправить 

export default MobileMenu;
