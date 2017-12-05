// @flow
import React from "react";
import styles from "./infoBox.css";

type Props = {
  icon: string,
  text: {
    heading: string,
    content: string
  }
}

const InfoBox = (props: Props) => (
  <div className={styles.infoBox}>
    <img src={props.icon} alt={props.text.heading} />
    <h3>{props.text.heading}</h3>
    <div>
      <p>{props.text.content}</p>
    </div>
  </div>
);

export default InfoBox;
