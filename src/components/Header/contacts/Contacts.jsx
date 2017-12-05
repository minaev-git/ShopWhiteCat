// @flow
import React from 'react';
import styles from './contacts.css';
import mail from './mail.svg';
import telephone from './telephone.svg';

const Contacts = () => (
  <div className="col-xl-3 col-lg-3 col-md-3 hiddenMobile">
    <div className={styles.contacts}>
      <p>
        <img src={telephone} alt="Телефон" />
        8-495-642-53-36
      </p>
      <p>
        <img src={mail} alt="Почта" />
        info@shopwhitecat.ru
      </p>
    </div>
  </div>
);
export default Contacts;
