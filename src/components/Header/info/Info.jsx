// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import info from 'components/Home/headingBar/info.svg';
import styles from './info.css';

const Info = () => (
  <div className="col-xl-1 col-lg-1 col-md-1 hiddenMobile">
    <Link to="/">
      <div className={styles.info}>
        <img src={info} alt="Информация" />
      </div>
    </Link>
  </div>
);

export default Info;
