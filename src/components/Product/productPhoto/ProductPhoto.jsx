// @flow
import React, { Component } from "react";
import styles from "./productPhoto.css";
import miniPhoto1 from "./miniPhoto1.png";
import miniPhoto2 from "./miniPhoto2.png";
import miniPhoto3 from "./miniPhoto3.png";
import miniPhoto4 from "./miniPhoto4.png";

export default class ProductPhoto extends Component {
  state = {
    currentImg: this.props.photos[0] || "",
    focusImg: null
  };

  initialImg = photo => {};

  changeImg = event => {
    if (this.state.focusImg) {
      this.state.focusImg.classList.remove(styles.active);
    }

    event.target.classList.add(styles.active);

    this.setState(() => ({
      currentImg: event.target.src,
      focusImg: event.target
    }));
    event.persist();
  };

  render() {
    let photos = { length: 0 };
    if (this.state.focusImg === null) {
      photos = (this.props.photos || []).map((photo, index) => {
        if (index === 0) {
          return (
            <img
              onClick={this.changeImg}
              className={styles.active}
              src={photo}
              alt="пяу это же тест"
            />
          );
        }
        return (
          <img onClick={this.changeImg} src={photo} alt="пяу это же тест" />
        );
      });
    } else {
      photos = (this.props.photos || []).map(photo => (
        <img onClick={this.changeImg} src={photo} alt="пяу это же тест" />
      ));
    }

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
