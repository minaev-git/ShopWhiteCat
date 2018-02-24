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
            {this.props.title}<span className={styles.closeArrow}>&gt;</span>
          </button>
          <p>
            {this.props.text}
          </p>
        </div>
      );
    }
    return (
      <div className={styles.dropDown}>
        <button onClick={this.toOpenDropDown}>
          {this.props.title}<span>&gt;</span>
        </button>
      </div>
    );
  }
}
