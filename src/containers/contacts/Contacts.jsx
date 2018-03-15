import React, { Component } from "react";
import { Helmet } from "react-helmet";
import styles from "./contacts.css";

class Contacts extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className={styles.contactsPage}>
        <Helmet>
          <title>«Белый кот» — Контакты</title>
          <meta
            name="description"
            content="Контакты интернет-магазина «Белый кот»"
          />
        </Helmet>
        <h2>Контакты</h2>
        <div className={styles.line} />
        <div className={styles.description}>
          <p>
            Наш телефон: <span>8-495-642-53-36</span>
          </p>
          <p>
            Адрес электронной почты: <span>info@shopwhitecat.ru</span>
          </p>
          <p>
            ОГРН: <span>316774600373834</span>
          </p>
          <p>
            Адрес склада компании SMART:{" "}
            <span>г.Москва Барабанный переулок дом 4, стр 6</span>
          </p>
        </div>
        <div className="hiddenMobile">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A081c834e981ce9ebc3dfee03a6ad79079b340963031ab32f1c12335fce338536&amp;source=constructor"
            width="664"
            height="493"
            frameborder="0"
          />
        </div>
        <div className="hiddenDesktop">
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A081c834e981ce9ebc3dfee03a6ad79079b340963031ab32f1c12335fce338536&amp;source=constructor" width="100%" height="493" frameborder="0"></iframe>
        </div>
      </div>
    );
  }
}

export default Contacts;
