import React, { Component } from "react";
import styles from "./photoSlider.css";
import photo1 from "./miniPhoto1.png";
import photo2 from "./miniPhoto2.png";
import photo3 from "./miniPhoto3.png";
import photo4 from "./miniPhoto4.png";
import styled from "styled-components";

const PhotoBox = styled.div`
  position: relative;
  width: 17.875em;
  height: 23.25em;
`;

const PhotoContainer = styled.div`
  position: absolute;
  left: ${props => props.positionContainer};
  display: flex;
  border: 1px solid red;
`;

const Photo = styled.img`
  position: relative;
  display: inline-block;
  width: 17.875em;
  height: 23.25em;
`;

export default class PhotoSlider extends Component {
  state = {
    position: 0
  };

  swipePhotos = event => {
    if (this.state.postiton <= -17.875 * this.props.photos.length) {
      return null;
    }
    this.setState(prevState => ({
      position: prevState.position - 17.875
    }));
    setTimeout();
  };

  render() {
    const slides = (this.props.photos || []).map((elm, index) => (
      <div>
        <img
          className={styles.photos}
          src={this.state.activePhoto}
          onTouchMove={this.swipePhotos}
          alt="test"
          value={index}
        />
      </div>
    ));

    return (
      <PhotoBox onTouchEnd={this.swipePhotos}>
        <PhotoContainer positionContainer={`${this.state.position}em`}>
          <Photo src={photo1} alt="test" value={1} />
          <Photo src={photo2} alt="test" value={2} />
          <Photo src={photo3} alt="test" value={3} />
          <Photo src={photo4} alt="test" value={4} />
        </PhotoContainer>
      </PhotoBox>
    );
  }
}
