// @flow
import React from 'react';
import styles from './headingBar.css';

type Props = {
  heading: string,
  icon: string,
  alt: string
}

const HeadingBar = (props: Props) => (
  <div className={styles.headingBlock}>
    <img src={props.icon} alt={props.alt} />
    <h2>{props.heading}</h2>
  </div>
);

export default HeadingBar;
