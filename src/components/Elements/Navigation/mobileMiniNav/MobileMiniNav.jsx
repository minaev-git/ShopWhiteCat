// @flow
import React from "react";
import { Link } from "react-router-dom";
import type { Category } from "type/category";
import transliterate from "global/transliterate";
import styles from "./mobileMiniNav.css";

type Props = {
  categories: Category[],
  type: string
};

const MobileMinNav = (props: Props) => {
  if (props.type === "childCategory") {
    return (
      <div className={styles.category}>
        <Link
          to={`/category/mainCategory/${transliterate(
            props.categories.category.name
          )}/${props.categories.category.id}`}
          key={props.categories.category.id}
        >
          {props.categories.category.name}
          <p>&gt;</p>
        </Link>
      </div>
    );
  }
  const categories = (props.categories.child_categories || []).map(category => (
    <Link
      to={`/category/subCategory/${transliterate(category.name)}/${category.id}`}
      key={category.id}
    >
      {category.name}
      <p>&gt;</p>
    </Link>
  ));
  return <div className={styles.category}>{categories}</div>;
};

export default MobileMinNav;
