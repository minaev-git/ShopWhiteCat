import React from "react";
import { Link } from "react-router-dom";
import styles from "./breadCrumb.css";

const BreadCrumb = props => {

  const BreadCrumbLinks = (props.breadCrumbLinks || []).map((value)=>{
    return(
      <Link to={value.link}>
        {value.name}
        <p>/</p>
      </Link>
    )
  })

  return (
    <div className={styles.miniNavMenu}>
      <Link to="/">
        Главная
        <p>/</p>
      </Link>
      {BreadCrumbLinks}
    </div>
  );
};

export default BreadCrumb;
