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
      currentImg: this.props.photos[0] || "",
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
    const photos = (this.props.photos || []).map((photo, index) => (
      <img onClick={this.changeImg} src={photo} alt="пяу это же тест" />
    ));

    return (
      <div className={styles.productPhoto}>
        <img
          className={styles.currentPhoto}
          src={this.state.currentImg}
          alt="Test"
        />
        {photos.length > 1 ? (
          <div className={styles.alternativeImage}>{photos}</div>
        ) : null}
      </div>
    );
  }
}
