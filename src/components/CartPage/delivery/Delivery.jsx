import React, { Component } from "react";
import styles from "./delivery.css";

export default class Delivery extends Component {
  render() {
    return (
      <div className={styles.delivery}>
        <h2>Доставка и оплата</h2>
        <div className={styles.line} />
        <div className={styles.description}>
          <p>
            {
              "Заказ товаров на дом и в офис осуществляется с 9.00 до 22.00 \n через интернет-магазин или по телефону 8-495-642-53-36. \n \n Доставка по России осуществляется почтой РФ, наложенным платежом. \n Вы оплачиваете заказ наличными курьеру при его получении. \n \n Магазин доставляет по всей России, информацию по вашему региону вы можете найти ниже."
            }
          </p>
          <h4 className={styles.priceTitle}>Стоимость</h4>
          <h5>Доставка по Москве</h5>
          <p>
            Заказ на сумму до <span className={styles.blue}>1000 руб.</span> -
            доставка <span className={styles.blue}>250 руб.</span>
          </p>
          <p>
            Заказ на сумму от <span className={styles.blue}>1000 руб.</span> -
            доставка <span className={styles.blue}>бесплатно.</span>
          </p>
          <h5>Доставка по Подмосковью</h5>
          <p>
            Заказ на сумму до <span className={styles.blue}>1000 руб.</span> -
            доставка 30 руб. за километр от МКАД, но не менее{" "}
            <span className={styles.blue}>250 руб.</span>
          </p>
          <p>
            Заказ на сумму от <span className={styles.blue}>1000</span> до{" "}
            <span className={styles.blue}>3000 руб.</span> - доставка 20 руб. за
            километр от МКАД, но не менее{" "}
            <span className={styles.blue}>200 руб.</span>
          </p>
          <p>
            Заказ на сумму от <span className={styles.blue}>3000</span> до{" "}
            <span className={styles.blue}>5000 руб.</span> - доставка 10 руб. за
            километр от МКАД, но не менее{" "}
            <span className={styles.blue}>100 руб.</span>
          </p>
          <p>
            Заказ на сумму от <span className={styles.blue}>6000 руб.</span> -
            доставка <span className={styles.blue}>бесплатно.</span>
          </p>
          <h5>Доставка по России</h5>
          <p>
            Заказ на сумму до <span className={styles.blue}>1000 руб.</span> -{" "}
            <span className={styles.red}>Не отправляем!</span>
          </p>
          <p>
            Заказ на сумму от <span className={styles.blue}>1000</span> до{" "}
            <span className={styles.blue}>6000 руб.</span> - доставка 350 руб.
          </p>
          <p>
            Заказ на сумму от <span className={styles.blue}>6000 руб.</span> -
            доставка <span className={styles.blue}>бесплатно.</span>
          </p>
        </div>
      </div>
    );
  }
}
