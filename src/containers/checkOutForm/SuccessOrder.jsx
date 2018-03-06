import React from "react";
import styles from "./successOrder.css";

const SuccessOrder = ({handleShowCheckOutForm}) => (
  <div className={styles.successBlock}>
    <button
      className={styles.close}
      onClick={handleShowCheckOutForm}
      type="button"
    />
    <div className={styles.success}>
      <div className={styles.check_mark}>
        <div
          className={`${styles.saicon} ${styles.sasuccess} ${styles.animate}`}
        >
          <span
            className={`${styles.saline} ${styles.satip} ${
              styles.animateSuccessTip
            }`}
          />
          <span
            className={`${styles.saline} ${styles.salong} ${
              styles.animateSuccessLong
            }`}
          />
          <div className={styles.saplaceholder} />
          <div className={styles.safix} />
        </div>
      </div>
    </div>
    <p className={styles.orderSuccess}>Заказ оформлен</p>
    <p className={styles.operator}>Оператор уже набирает ваш номер!</p>
  </div>
);

export default SuccessOrder;
