import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "./photoBanner.css";

const PhotoBanner = state => {
  const Photo = styled.div`
    background-image: url(${state.photo});
    width: ${state.stylePhoto.width};
    height: ${state.stylePhoto.height};
    margin: ${state.stylePhoto.margin};
    padding: ${state.stylePhoto.padding};
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 13px;
      width: ${parseInt(state.stylePhoto.width,10) + 1.85}em; 
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 10px;
      width: ${parseInt(state.stylePhoto.width,10)}em;
    }
  `;

  return (
    <Link to={state.link} className={styles.photoLink}>
      <Photo className={styles.photoBanner}>
        <span>
          <h2>{state.text.heading}</h2>
          <p>{state.text.content}</p>
        </span>
        <span className={styles.price}>
          <span style={{ fontWeight: "300", marginRight: "0.4em" }}>от</span>
          <span
            style={{
              color: "#ffaf0a",
              fontWeight: "700",
              marginRight: "0.4em"
            }}
          >
            —
          </span>
          <b>{state.text.price}</b>
        </span>
      </Photo>
    </Link>
  );
};

export default PhotoBanner;
