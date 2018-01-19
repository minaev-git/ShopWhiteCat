import React, { Component } from "react";
import styles from "./mobileDropDown.css";

export default class MobileDropDown extends Component {
  state = {
    isOpen: false
  };

  toOpenDropDown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    if (this.state.isOpen) {
      return (
        <div className={styles.dropDown}>
          <button onClick={this.toOpenDropDown}>
            Характеристики<span className={styles.closeArrow}>&gt;</span>
          </button>
          <p>
            Салфетка для стекла — одно самых любимых и необходимых дома изделий.
            Она без лишних хлопот, за один проход сделает Ваше окно неузнаваемо
            чистым. И не только окно — зеркало, полировка вашей мебели,
            хрустальные подвески люстры — все засверкает и заблестит.
          </p>
        </div>
      );
    }
    return (
      <div className={styles.dropDown}>
        <button onClick={this.toOpenDropDown}>
          Характеристики<span>&gt;</span>
        </button>
      </div>
    );
  }
}
