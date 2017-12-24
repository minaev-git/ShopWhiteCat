import React, { Component } from "react";
import styled from "styled-components";
import ReactSwipe from "react-swipe";
import styles from "./photoSlider.css";
import photo1 from "./miniPhoto1.png";
import photo2 from "./miniPhoto2.png";
import photo3 from "./miniPhoto3.png";
import photo4 from "./miniPhoto4.png";

const PhotoBox = styled.div`
  position: relative;
  justify-content: center;
  margin-top: 1em;
  margin-bottom: 1em;
  z-index: 6;
  width: 18em;
  height: 23.25em;
`;

const Counters = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 0.5em;
  text-align: center;
`;

const Photo = styled.img`
  position: relative;
  display: inline-block;
  width: 18em;
  height: 23.25em;
`;

export default class PhotoSlider extends Component {
  state = {
    currentSlide: 0
  };

  swipe = index => {
    this.setState(() => ({
      currentSlide: index
    }));
  };

  changeColor = () => {};

  render() {
    const slides = (this.props.photos || []).map((elm, index) => (
      <div>
        <img className={styles.photos} alt="test" value={index} />
        <div>f</div>
      </div>
    ));

    const counter = (this.props.photos || []).map((elm, index, arr) => {
      if (arr.length <= 1) {
        return null
      }
      if (index === this.state.currentSlide) {
        return (
          <div className={`${styles.active} ${styles.counter}`} value={index} />
        );
      }
      return <div className={styles.counter} value={index} />;
    });

    return (
      <PhotoBox onTouchMove={this.onTouchMove}>
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: false, callback: this.swipe }}
        >
          <Photo src={photo1} alt="test" value={1} />
          <Photo src={photo2} alt="test" value={2} />
          <Photo src={photo3} alt="test" value={3} />
          <Photo src={photo4} alt="test" value={4} />
        </ReactSwipe>
        <Counters>{counter}</Counters>
      </PhotoBox>
    );
  }
}
