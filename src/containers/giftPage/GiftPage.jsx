import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import transliterate from "global/transliterate";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { getGiftProducts } from "redux/modules/gift";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import styles from "./giftPage.css";
import testImg from "./testImg.png";

class GiftPage extends Component {
  componentDidMount() {
    this.props.getGiftProducts();
    document.title = "«Белый кот» — Подарки";
    window.scrollTo(0, 0);
  }

  render() {
    const { isFetching, entity } = this.props.gift;

    if (isFetching) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    const gifts = entity.products.map((gift, index) => (
      <Link to={`/product/${transliterate(gift.name)}/${gift.id}`}>
        <GiftCard position={index + 1}>
          <img src={JSON.parse(gift.images)[0]} alt={gift.name} />
          <div>
            <h3>{gift.name}</h3>
            <p>На сумму от {1000 * (index + 1)}&#160;р</p>
          </div>
        </GiftCard>
      </Link>
    ));

    return (
      <div className={styles.giftPage}>
        <h2>Подарки</h2>
        <div className={styles.line} />
        <p className={styles.description}>
          Магазин дарит подарки, при заказе на отпреденную сумму.
        </p>
        {gifts}
      </div>
    );
  }
}

const GiftCard = styled.div`
  position: relative;
  width: 40em;
  border: 5px solid rgba(8, 168, 176, .${props => props.position});
  padding: 0.75em 0 0.9em 0;
  margin: 0.6em auto;
  img {
    display: inline-block;
    width: 8.93em;
    height: 11.81em;
  }
  div {
    display: inline-block;
    vertical-align: top;
    width: 30em;
    margin-left: 0.2em;
  }
  h3 {
    margin-top: 0.5em;
    margin-left: 0.5em;
    font: 1.3em "Open Sans";
    font-weight: 400;
    word-wrap: break-all;
    color: #303030;
  }
  p {
    margin-top: 2.3em;
    margin-right: 2em;
    text-align: center;
    font: 1.6em "Open Sans";
    font-weight: 400;
    color: #303030;
  }
  @media (max-width: 767px) {
    width: 100%;
    div {
      width: 70%;
    }
  }
  @media (max-width: 480px) {
    width: 100%;
    img {
      width: 6.93em;
      height: 9.81em;
    }
    div {
      width: 63%;
    }
    h3 {
      font-size: 1.2em;
    }
    p {
      margin-right: 0;
      font-size: 1.5em;
    }
  }
`;

function mapStateToProps(state) {
  return {
    gift: state.gift
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGiftProducts: bindActionCreators(getGiftProducts, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GiftPage)
);
