// @flow
import React from "react";
import styles from "./infoBlock.css";
import InfoBox from "../infoBox/InfoBox";
import delivery from "./bibika.png";
import gift from "./gift.png";
import cooperation from "./arms.png";
import * as text from "./text";

const InfoBlock = () => (
  <div className={`row ${styles.infoBlock}`}>
    <div className="col-xl-4 col-lg-4 col-md-4">
      <InfoBox icon={delivery} text={text.delivery} />
    </div>
    <div className="col-xl-4 col-lg-4 col-md-4">
      <InfoBox icon={gift} text={text.gift} />
    </div>
    <div className="col-xl-4 col-lg-4 col-md-4">
      <InfoBox icon={cooperation} text={text.cooperation} />
    </div>
  </div>
);

export default InfoBlock;
