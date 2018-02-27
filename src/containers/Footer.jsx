import React, { Component } from "react";
import catLogo from 'assets/cat.png';
import styles from './styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className={styles.logoLayout}>
          <img src={catLogo} alt="Белый кот" />
          <h2>Белый кот</h2>
          <h3>Интернет-магазин</h3>
        </div>
        <div className={styles.contacts}>
          <p>Наш телефон: 8-495-642-53-36</p>
          <p>Адрес электронной почты: info@shopwhitecat.ru</p>
          <p>ОГРН: 316774600373834</p>
        </div>
        <div className={styles.info}>
          <h3>Информация</h3>
          <a>Подарки</a>
          <a>Доставка и оплата</a>
          <a>Контакты</a>
        </div>
      </footer>
    )
  }
}

export default Footer;