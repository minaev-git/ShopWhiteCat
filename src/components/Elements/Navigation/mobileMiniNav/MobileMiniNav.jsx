// @flow
import React from "react";
import { Link } from "react-router-dom";
import type { Category } from "type/category";
import transliterate from "global/transliterate";
import styles from "./mobileMiniNav.css";

type Props = {
  categories: Category[],
  type: string
}

const MobileMinCategory = (props: Props) => {
  const categories = (props.categories || []).map(category => (
    <Link
      to={`/${props.type}/${transliterate(category.name)}/${category.id}`}
      key={category.id}
    >
      {category.name}
      <p>&gt;</p>
    </Link>
  ));
  return <div className={styles.category}>{categories}</div>;
};

export default MobileMinCategory;
