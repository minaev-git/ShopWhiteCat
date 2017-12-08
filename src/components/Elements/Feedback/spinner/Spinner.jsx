// @flow
import React from "react";
import styles from "./spinner.css";

const Spinner = () => (
  <div className={styles.cssloadthecube}>
    <div className={`${styles.cssloadcube} ${styles.cssloadc1}`} />
    <div className={`${styles.cssloadcube} ${styles.cssloadc2}`} />
    <div className={`${styles.cssloadcube} ${styles.cssloadc4}`} />
    <div className={`${styles.cssloadcube} ${styles.cssloadc3}`} />
  </div>
);

export default Spinner;
