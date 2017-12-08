// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './logo.css';
import icon from './icon.png';

const Logo = () => (
  <div
    className={`col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6 ${styles.miniPhone}`}
  >
    <Link to="/">
      <div className={styles.logoBox}>
        <img src={icon} alt="logo" />
        <h1>Белый кот</h1>
      </div>
    </Link>
  </div>
);

export default Logo;
