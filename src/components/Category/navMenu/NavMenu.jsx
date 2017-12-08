// @flow
import React from "react";
import type { Node } from 'react';
import type { Category } from 'type/category'
import { NavLink } from "react-router-dom";
import transliterate from "global/transliterate";
import styles from "./navMenu.css";

type Props = {
  categories: Category[]
};

const NavMenu = ({ categories }: Props) => {
  const categoriesList: Array<Node> = categories.map(category => (
    <div key={category.id}>
      <NavLink
        to={`/category/${transliterate(category.name)}/${category.id}`}
        activeClassName={styles.active}
      >
        {category.name}
        <p>{category.count}</p>
      </NavLink>
      {category.child_categories.map(childCategory => (
        <NavLink
          to={`/subcategory/${transliterate(childCategory.name)}
          /${childCategory.id}`}
          className={styles.childCategory}
          activeClassName={styles.active}
          key={childCategory.id}
        >
          {childCategory.name}
          <p>{childCategory.count}</p>
        </NavLink>
      ))}
    </div>
  ));

  return (
    <div className="col-xl-3 col-lg-3 col-md-3">
      <div className={styles.navMenu}>
        <h2>Категории</h2>
        {categoriesList}
      </div>
    </div>
  );
};

export default NavMenu;
