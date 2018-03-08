// @flow
import React from "react";
import { Link } from "react-router-dom";
import styles from "./infoBox.css";

type Props = {
  icon: string,
  text: {
    heading: string,
    content: string
  },
  link: string
};

const InfoBox = (props: Props) => (
  <div className={styles.infoBox}>
    <Link to={props.link}>
      <img src={props.icon} alt={props.text.heading} />
    </Link>
    <Link to={props.link}><h3>{props.text.heading}</h3></Link>
    <div>
      {props.text.content}
    </div>
  </div>
);

export default InfoBox;
