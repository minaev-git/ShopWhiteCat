import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as saleProductsAction from "redux/modules/saleProducts";
import PhotoBanner from "components/Home/photoBanner/PhotoBanner";
import photo1 from "components/Home/photoBanner/phote1.jpg";
import photo2 from "components/Home/photoBanner/phote2.jpg";
import photo3 from "components/Home/photoBanner/phote3.jpg";
import * as textPhotoBanner from "components/Home/photoBanner/text";
import Spinner from "components/Elements/Feedback/spinner/Spinner";
import HeadingBar from "components/Home/headingBar/HeadingBar";
import saleHeadingIcon from "components/Home/headingBar/sale.svg";
import infoHeadingIcon from "components/Home/headingBar/info.svg";
import newspaperHeadingIcon from "components/Home/headingBar/newspaper.svg";
import SaleProducts from "components/Home/saleProducts/SaleProducts";
import InfoBlock from "components/Home/infoBlock/InfoBlock";
import ArticlesBlock from "components/Home/articlesBlock/ArticlesBlock";
import styles from "./styles/Home.css";

class Home extends Component {
  componentDidMount() {
    this.props.saleProductsAction.getSaleProducts();
    window.scrollTo(0, 0);
  }

  render() {
    const { saleProducts = [] } = this.props.saleProducts.entity;
    const { categories = [] } = this.props.categories.entity;
    const isFetchingCategories = this.props.categories.isFetching;
    const isFetchingSaleProducts = this.props.saleProducts.isFetching;

    if (isFetchingCategories || isFetchingSaleProducts) {
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className={`container-fluid ${styles.home}`}>
        <Helmet>
          <title>«Белый кот» — Главная страница</title>
          <meta
            name="description"
            content="У нас представлены товары для уборки дома компании Белый кот и Smart. "
          />
        </Helmet>
        <div className={`row ${styles.photoBanner} hiddenMobile`}>
          <div className="col-xl-5 col-lg-5 col-md-5">
            <PhotoBanner
              photo={photo1}
              stylePhoto={{
                margin: "0.5em 0 0 0",
                padding: "12em 0 0 1.4em",
                width: "29.375em",
                height: "36.05em"
              }}
              text={textPhotoBanner.text1}
              link="/category/subCategory/polotentsa-bannie/41"
            />
          </div>
          <div className="col-xl-7 col-lg-7 col-md-7">
            <PhotoBanner
              photo={photo2}
              stylePhoto={{
                margin: "0.5em 0 0.5em 1em",
                width: "38.75em",
                height: "19.36em"
              }}
              text={textPhotoBanner.text2}
              link="/category/mainCategory/salfetki/25"
            />
            <PhotoBanner
              photo={photo3}
              stylePhoto={{
                margin: "1em 0 0 1em",
                width: "38.75em",
                height: "15.6875em"
              }}
              text={textPhotoBanner.text3}
              link="/category/subCategory/schetki-dlya-pola/26"
            />
          </div>
        </div>
        <div className="hiddenDesktop">
          <PhotoBanner
            photo={photo1}
            stylePhoto={{
              margin: "5em 0 1.5em 0",
              padding: "0 0 0 1.4em",
              width: "100%",
              height: "17.375em"
            }}
            text={textPhotoBanner.text1}
            link="/category/subCategory/polotentsa-bannie/41"
          />
        </div>
        <HeadingBar
          heading="Товары со скидками"
          icon={saleHeadingIcon}
          alt="Скидки"
        />
        <SaleProducts saleProducts={saleProducts} />
        <div className="hiddenDesktop">
          <PhotoBanner
            className="hiddenDesktop"
            photo={photo2}
            stylePhoto={{
              margin: "0 0 1.5em 0",
              width: "100%",
              height: "17.375em"
            }}
            text={textPhotoBanner.text2}
            link="/category/mainCategory/salfetki/25"
          />
        </div>
        <HeadingBar
          heading="Информация"
          icon={infoHeadingIcon}
          alt="Информация"
        />
        <InfoBlock />
        <div className="hiddenDesktop">
          <PhotoBanner
            className="hiddenDesktop"
            photo={photo3}
            stylePhoto={{
              margin: "0 0 1.5em 0",
              width: "100%",
              height: "17.375em"
            }}
            text={textPhotoBanner.text3}
            link="/category/subCategory/schetki-dlya-pola/26"
          />
        </div>
        <HeadingBar
          heading="Полезные статьи"
          icon={newspaperHeadingIcon}
          alt="Статьи"
        />
        <ArticlesBlock />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saleProducts: state.saleProducts,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saleProductsAction: bindActionCreators(saleProductsAction, dispatch)
  };
}

Home.propTypes = {
  saleProducts: PropTypes.shape({
    saleProducts: PropTypes.array
  }).isRequired,
  categories: PropTypes.shape({
    categoriesNav: PropTypes.array
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
