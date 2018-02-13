import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./menu.css";
import transliterate from "global/transliterate";

const Menu = state => {
  let reverse = "";
  let childCategories = [];
  const categories = state.categories.map((category, index) => {
    childCategories = (category.child_categories || []).map(childCategory => (
      <li>
        <NavLink
          to={`/subcategory/${transliterate(childCategory.name)}/${
            childCategory.id
          }`}
          key={childCategory.id}
        >
          {childCategory.name}
        </NavLink>
      </li>
    ));

    reverse = index >= 3 ? styles.reverse : "";
    return (
      <li>
        <NavLink
          to={`/category/${transliterate(category.name)}/${category.id}`}
          key={category.id}
        >
          {category.name}
        </NavLink>
        <div className={`${styles.subMenu} ${reverse}`}>
          <ul>{childCategories}</ul>
          <img src={JSON.parse(category.image)} alt={category.name} />
        </div>
      </li>
    );
  });
  return (
    <div className="col-xl-12 col-lg-12 col-md-12 hiddenMobile">
      <ul className={styles.menu}>{categories}</ul>
    </div>
  );
};

export default Menu;
