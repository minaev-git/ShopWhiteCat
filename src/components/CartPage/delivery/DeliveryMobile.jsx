import React from "react";
import MobileDropDown from "components/Elements/DataDisplay/mobileDropDown/MobileDropDown";
import styles from "./deliveryMobile.css";

const DeliveryMobile = () => (
  <div className={styles.deliveryMobile}>
    <h2>Доствка и оплата</h2>
    <p>
      {
        "Заказ товаров на дом и в офис осуществляется с 9.00 до 22.00 \nчерез интернет-магазин или по телефону 8-495-642-53-36. \n \nДоставка по России осуществляется почтой РФ, наложенным платежом. \nВы оплачиваете заказ наличными курьеру при его получении. \n \nМагазин доставляет по всей России, информацию по вашему региону вы можете найти ниже."
      }
    </p>
    <MobileDropDown
      title="Москва"
      text={
        <div className={styles.description}>
          <p>
            Заказ на сумму до <span className={styles.blue}>1000 руб.</span> -
            доставка <span className={styles.blue}>250 руб.</span>
          </p>
          <p>
            Заказ на сумму от <span className={styles.blue}>1000 руб.</span> -
            доставка <span className={styles.blue}>бесплатно.</span>
          </p>
        </div>
      }
    />
    <MobileDropDown
      title="Подмосковье"
      text={
        <div className={styles.description}>
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
        </div>
      }
    />
    <MobileDropDown
      title="Россия"
      text={
        <div className={styles.description}>
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
      }
    />
  </div>
);

export default DeliveryMobile;
