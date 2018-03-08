import React, { Component } from "react";
import styles from "./successOrder.css";

class SuccessOrder extends Component {
  componentDidMount() {
    this.props.getCount();
  }
  render() {
    return (
      <div className={styles.successBlock}>
        <button
          className={styles.close}
          onClick={this.props.handleShowCheckOutForm}
          type="button"
        />
        <div className={styles.success}>
          <div className={styles.check_mark}>
            <div
              className={`${styles.saicon} ${styles.sasuccess} ${
                styles.animate
              }`}
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
  }
}

export default SuccessOrder;
