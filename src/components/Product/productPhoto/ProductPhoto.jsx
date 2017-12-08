// @flow
import React, { Component } from "react";
import styles from "./productPhoto.css";
import miniPhoto1 from "./miniPhoto1.png";
import miniPhoto2 from "./miniPhoto2.png";
import miniPhoto3 from "./miniPhoto3.png";
import miniPhoto4 from "./miniPhoto4.png";

export default class ProductPhoto extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentImg: miniPhoto1,
      focusImg: null
    };
    this.changeImg = this.changeImg.bind(this);
  }

  changeImg(event) {
    if (this.state.focusImg) {
      this.state.focusImg.classList.remove(styles.active);
    }

    event.target.classList.add(styles.active);

    this.setState(() => ({
      currentImg: event.target.src,
      focusImg: event.target
    }));
    event.persist();
  }

  render() {
    return (
      <div className={styles.productPhoto}>
        <img src={this.state.currentImg} alt="Photo" />
        <div className={styles.alternativeImage}>
          <img onClick={this.changeImg} src={miniPhoto2} alt="Photo1" />
          <img onClick={this.changeImg} src={miniPhoto1} alt="Photo1" />
          <img onClick={this.changeImg} src={miniPhoto3} alt="Photo1" />
        </div>
      </div>
    );
  }
}
