// @flow
import React from "react";
import { Link } from "react-router-dom";
import info from "components/Home/headingBar/info.svg";
import Popover from "components/Elements/DataDisplay/popover/Popover";
import styles from "./info.css";

const Info = () => (
  <div className="col-xl-1 col-lg-1 col-md-1 hiddenMobile">
    <Popover
      content={
        <div className={styles.popover}>
          <h3>Информация</h3>
          <Link className={styles.delivery} to="/delivery">Доставка и оплата</Link>
          <Link className={styles.gift} to="/gift">Подарки</Link>
          <Link className={styles.contacts} to="/contacts">Контакты</Link>
        </div>
      }
    >
      <div className={styles.info}>
        <img src={info} alt="Информация" />
      </div>
    </Popover>
  </div>
);

export default Info;
