import React from "react";
import { Link } from "react-router-dom";
import styles from "./menu.css";
import transliterate from "global/transliterate";

const Menu = state => {
  let reverse = "";
  let childCategories = [];
  const categories = state.categories.map((category, index) => {
    reverse = index >= 3 ? styles.reverse : "";
    return (
      <Link
        to={`/category/${transliterate(category.name)}/${category.id}`}
        key={category.id}
      >
        <li>
          {category.name}
          <div className={`${styles.submenu} ${reverse}`}>
            <ul>
              {
                (childCategories = (category.child_categories || [])
                  .map(childCategory => (
                    <Link
                      to={`/subcategory/${transliterate(
                        childCategory.name
                      )}/${childCategory.id}`}
                      key={childCategory.id}
                    >
                      <li>{childCategory.name}</li>
                    </Link>
                  )))
              }
            </ul>
            <img src={JSON.parse(category.image)} alt={category.name} />
          </div>
        </li>
      </Link>
    );
  });
  return (
    <div className="col-xl-12 col-lg-12 col-md-12 hiddenMobile">
      <ul className={styles.menu}>{categories}</ul>
    </div>
  );
};

//Исправить 

export default Menu;
