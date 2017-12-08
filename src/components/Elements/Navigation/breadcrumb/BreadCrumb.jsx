import React from 'react';
import { Link } from 'react-router-dom';
import transliterate  from 'global/transliterate';
import styles from './breadCrumb.css';

const MiniNavMenu = state => {
  let categoryLink = '';
  let presentCategory = { name: '' };

  if (state.type === 'category') {
    categoryLink = state.categoryNav;
  }
  if (state.type === 'childCategory') {
    categoryLink = state.categoryNav.category || { name: '' };
    presentCategory = state.categoryNav;
  }

  return (
    <div className={styles.miniNavMenu}>
      <Link to="/">
        Главная
        <p>/</p>
      </Link>
      <Link
        to={`/category/${transliterate(categoryLink.name)}/${categoryLink.id}`}
      >
        {categoryLink.name}
        <p>/</p>
      </Link>
      <Link
        to={`/subcategory/${transliterate(
          presentCategory.name,
        )}/${presentCategory.id}`}
      >
        {presentCategory.name}
        <p>/</p>
      </Link>
    </div>
  );
};

// Исправить 

export default MiniNavMenu;
